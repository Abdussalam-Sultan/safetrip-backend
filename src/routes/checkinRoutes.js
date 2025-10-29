import express from 'express';
import { createCheckIn, getUserCheckIns } from '../controllers/checkinController.js';
import  authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

// Routes
router.post('/', authenticateUser, createCheckIn);
router.get('/', authenticateUser, getUserCheckIns);

export default router;
