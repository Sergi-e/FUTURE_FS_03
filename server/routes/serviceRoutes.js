import { Router } from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
  getServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = Router();

const serviceFields = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('icon').optional().isString(),
  body('active').optional().isBoolean(),
];

router.get('/', getServices);
router.get('/all', protect, getAllServicesAdmin);
router.post('/', protect, serviceFields, createService);
router.put('/:id', protect, serviceFields, updateService);
router.delete('/:id', protect, deleteService);

export default router;
