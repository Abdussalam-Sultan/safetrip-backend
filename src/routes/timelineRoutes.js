import express from 'express';
import { 
  getUserTimeline, 
  getTimelineStats, 
  getGroupedTimeline 
} from '../controllers/timelineController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

// All routes require authentication
router.get('/', authenticateUser, getUserTimeline);
router.get('/stats', authenticateUser, getTimelineStats);
router.get('/grouped', authenticateUser, getGroupedTimeline);

export default router;