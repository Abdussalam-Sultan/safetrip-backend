import axios from "axios";
import APP_CONFIG from "../config/APP_CONFIG.js";
import logger from "../config/logger.js";

const getCoordinatesService = async (address) => {
    try {
        const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${APP_CONFIG.GEOAPIFY_API_KEY}`);        

        const data = geoResponse.data.features?.[0].properties || [];
        logger.info(`Coordinates for ${data.formatted} found!`);
        
        return data
        
    } catch (error) {
        logger.error(`Error getting coordinates ${error.message}`);
    };

};


const nearbyHelpService = async (data) => {
    const helpServices = [
        "commercial.shopping_mall",
        "service.police",
        "commercial.supermarket",
        "accommodation.hotel",
        "commercial.gas",
        "catering.restaurant",
        "healthcare.hospital",
        "accommodation.motel"
    ];

    const { lat, lon, place_id } = data;

    const helpServiceDetails = {};

    await Promise.all(
        helpServices.map(async (category) => {
            try {
                const response = await axios.get(`https://api.geoapify.com/v2/places?categories=${category}&filter=place:${place_id}&limit=20&bias=proximity:${lon},${lat}&apiKey=${APP_CONFIG.GEOAPIFY_API_KEY}`);

                const features = response.data.features || [];
                logger.info(`\n\nCategory: ${category}, Results: ${features.length} `);
                
                features.forEach(element => {
                    logger.info(`address: ${element.properties.formatted}, latitude: ${element.properties.lat}, longitude: ${element.properties.lon}`)
                });

                helpServiceDetails[category] = features;
            } catch (error) {
                logger.error(`Error fetching ${category}: ${error.message}`);
                helpServiceDetails[category] = [];
            };
        })
    );

    return helpServiceDetails;
};

export default { getCoordinatesService, nearbyHelpService };



await nearbyHelpService(await getCoordinatesService("Jikwoyi phase 1 abuja nigeria"));