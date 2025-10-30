import { Router } from "express";
import { helpCoordinates, nearbyHelp } from "../controllers/helpController.js";

const router = Router();

router.post('/help-coordinates', helpCoordinates);
router.post('/nearby-help', nearbyHelp);