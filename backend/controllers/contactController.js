import { validationResult } from 'express-validator';
import { ContactMessage } from '../models/index.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, company, email, phone, message } = req.body;

    const contact = await ContactMessage.create({
      name,
      company,
      email,
      phone,
      message,
    });

    res.status(201).json({ message: 'Contact request received', contactId: contact.id });
  } catch (error) {
    next(error);
  }
};
