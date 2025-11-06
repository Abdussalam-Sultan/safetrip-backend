import logger from "../config/logger.js";
import helpServices from "../services/helpServices.js";
import AppError from "../utils/AppError.js";


export const nearbyHelpFromCurrentLocation = async (req, res) => {
    try {
        const { lat, lon } = req.body;
        if  (!lat || !lon) return res.status(500).json({ success: false, message: "Service is not availble a the moment!"});

        const nearbyHelp = await helpServices.nearbyHelpService(lat, lon);
        if (!nearbyHelp) return res.status(500).json({ success: false, message: "Service is not availble a the moment!"});

        res.status(200).json({ message: "Nearby help centers gotten", data: nearbyHelp });
        
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        throw new AppError("Internal server error", 500);
    };

};


export const nearbyHelpFromTravelDestination = async (req, res) => {
    try {
        const { address } = req.body;
        if (!address) return res.status(400).json({ success: false, message: "Address is required!"});

        const coordinatesData = await helpServices.getCoordinatesService(address);
        if (!coordinatesData) res.status(500).json({ success: false, message: "Service is not availble a the moment!"});

        const { lat, lon, place_id } = coordinatesData;
        if  (!lat || !lon) return res.status(500).json({ success: false, message: "Service is not availble a the moment!"});

        const nearbyHelp = await helpServices.nearbyHelpService(lat, lon, place_id);
        if (!nearbyHelp) return res.status(500).json({ success: false, message: "Service is not availble a the moment!"});

        res.status(200).json({ message: `Nearby help services for ${address} gotten successfully`, data: nearbyHelp});

        
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        throw new AppError("Internal server error", 500);
    };

};

