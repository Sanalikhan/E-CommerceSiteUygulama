import express from 'express';
import { body } from 'express-validator';
import { submitContactMessage } from '../controllers/contactController.js';

const router = express.Router();

router.post(
  '/',
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('company').optional({ checkFalsy: true }).trim().escape(),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().escape(),
  body('message').trim().notEmpty().withMessage('Message is required').escape(),
  submitContactMessage,
);

export default router;
