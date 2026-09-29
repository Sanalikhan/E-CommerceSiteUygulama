import express from 'express';
import whatsappRateLimit from '../middleware/whatsappRateLimit.js';
import { sendWhatsAppMessage } from '../controllers/whatsappController.js';

const router = express.Router();

router.post('/', whatsappRateLimit, sendWhatsAppMessage);

export default router;