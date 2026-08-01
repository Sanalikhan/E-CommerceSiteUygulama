import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/me', authMiddleware, getUserOrders);

export default router;
