import express from 'express';

import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contactRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import tipRoutes from './routes/tipRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import helpRoutes from './routes/helpRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import adminRoutes from './routes/adminRoutes.js'

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/sos', sosRoutes);
router.use('/checkins',authMiddleware, checkinRoutes);
router.use('/timeline', timelineRoutes);
router.use('/help', helpRoutes);
router.use("/tips", tipRoutes);
router.use('/admin', adminRoutes)

export default router;
