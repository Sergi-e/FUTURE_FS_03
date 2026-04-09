import { Router } from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { createContact, getContacts, markContactRead } from '../controllers/contactController.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('subject').optional().trim(),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  createContact
);

router.get('/', protect, getContacts);
router.patch('/:id/read', protect, markContactRead);

export default router;
