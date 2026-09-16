import express from 'express';
import authMiddleware, { adminOnly } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  seedProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, adminOnly, createProduct);
router.delete('/:id', authMiddleware, adminOnly, deleteProduct);
router.post('/seed', authMiddleware, adminOnly, seedProducts);

export default router;
