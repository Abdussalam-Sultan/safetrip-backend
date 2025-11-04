import express from 'express';
import { createSOS, getUserSOSEvents, updateSOSStatus } from '../controllers/sosController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.post('/', authenticateUser, createSOS);
router.get('/', authenticateUser, getUserSOSEvents);
router.put('/:id', authenticateUser, updateSOSStatus);

export default router;