// routes/timelineRoute.js
import express from "express";
import { getUserTimeline } from "../controllers/timelineController.js";

const router = express.Router();

router.get("/:userId", getUserTimeline);

export default router;
