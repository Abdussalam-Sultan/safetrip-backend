import express from 'express';
import { createSOS, getUserSOSEvents } from '../controllers/sosController.js';

const router = express.Router();

router.post('/', createSOS);
router.get('/', getUserSOSEvents);

export default router;