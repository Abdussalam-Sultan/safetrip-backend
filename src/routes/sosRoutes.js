import express from 'express';
import { createSOS, getUserSOSEvents, updateSOSStatus } from '../controllers/sosController.js';

const router = express.Router();

router.post('/', createSOS);
router.get('/', getUserSOSEvents);

export default router;