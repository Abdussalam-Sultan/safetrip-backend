import express from 'express';
import { createCheckIn, getUserCheckIns } from '../controllers/checkinController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/', createCheckIn);
router.get('/', getUserCheckIns);

export default router;
