import express from 'express';

//import authRoutes from './routes/authRoutes.js';
//import contactRoutes from './routes/contactRoutes.js';
//import sosRoutes from './routes/sosRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import helpRoutes from './routes/helpRoutes.js';
const router = express.Router();


//router.use('/auth', authRoutes);
//router.use('/contacts', contactRoutes);
//router.use('/sos', sosRoutes);
router.use('/checkins', checkinRoutes);
router.use('/timeline', timelineRoutes);
router.use('/help', helpRoutes);

export default router;
