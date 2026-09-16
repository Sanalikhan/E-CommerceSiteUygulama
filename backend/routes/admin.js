import express from 'express';
import authMiddleware, { adminOnly } from '../middleware/authMiddleware.js';
import { getAdminDashboard } from '../controllers/adminController.js';

const router = express.Router();

router.use(authMiddleware, adminOnly);
router.get('/dashboard', getAdminDashboard);

export default router;
