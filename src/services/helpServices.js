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
        return [];
    };

};


const nearbyHelpService = async (lat, lon, place_id=null) => {
    const helpServicesCategories = [
        "commercial.shopping_mall",
        "service.police",
        "commercial.supermarket",
        "accommodation.hotel",
        "commercial.gas",
        "catering.restaurant",
        "healthcare.hospital",
        "accommodation.motel",
        "commercial.books",
    ];

    const helpServicesResults = {};

    await Promise.all(
        helpServicesCategories.map(async (category) => {

            const formattedCategory = category.split('.')[1];
            
            try {
                const response = await axios.get(`https://api.geoapify.com/v2/places?categories=${category}&${place_id?`filter=place:${place_id}`:""}&limit=20&bias=proximity:${lon},${lat}&apiKey=${APP_CONFIG.GEOAPIFY_API_KEY}`);

                const features = response.data.features || [];

                logger.info(`\n\nCategory: ${formattedCategory}, Results: ${features.length} `);
                
                features.forEach(element => {
                    
                    logger.info(`address: ${element.properties.formatted}, latitude: ${element.properties.lat}, longitude: ${element.properties.lon}`)
                });


                helpServicesResults[formattedCategory] = features;
            } catch (error) {
                logger.error(`Error fetching ${formattedCategory}: ${error.message}`);
                helpServicesResults[formattedCategory] = [];
            };
        })
    );

    return helpServicesResults;
};

export default { getCoordinatesService, nearbyHelpService };


// const {lat, lon, place_id} = await getCoordinatesService("lagos")
// await nearbyHelpService(lat, lon, place_id);