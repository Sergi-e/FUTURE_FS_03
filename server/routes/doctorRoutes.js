import { Router } from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
  getDoctors,
  getAllDoctorsAdmin,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';

const router = Router();

const doctorCreateFields = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('specialty').trim().notEmpty().withMessage('Specialty is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('bio').optional().isString(),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('available').optional().isBoolean(),
];

const doctorUpdateFields = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('specialty').optional().trim().notEmpty().withMessage('Specialty cannot be empty'),
  body('department').optional().trim().notEmpty().withMessage('Department cannot be empty'),
  body('bio').optional().isString(),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('available').optional().isBoolean(),
];

router.get('/', getDoctors);
router.get('/all', protect, getAllDoctorsAdmin);
router.post('/', protect, doctorCreateFields, createDoctor);
router.put('/:id', protect, doctorUpdateFields, updateDoctor);
router.delete('/:id', protect, deleteDoctor);

export default router;
