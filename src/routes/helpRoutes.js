import { Router } from "express";
import { nearbyHelpFromCurrentLocation, nearbyHelpFromTravelDestination } from "../controllers/helpController.js";

const router = Router();

router.post('/from-travel-address', nearbyHelpFromTravelDestination);
router.post('/from-current-location', nearbyHelpFromCurrentLocation);