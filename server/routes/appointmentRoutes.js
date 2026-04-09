import { Router } from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { departments } from '../models/Appointment.js';

const router = Router();

const deptValues = departments;

router.post(
  '/',
  [
    body('patientName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('department').isIn(deptValues).withMessage('Invalid department'),
    body('preferredDate').isISO8601().toDate().withMessage('Valid date required'),
    body('preferredTime').trim().notEmpty().withMessage('Preferred time is required'),
    body('message').optional().isString(),
  ],
  createAppointment
);

router.get('/', protect, getAppointments);
router.patch('/:id', protect, updateAppointmentStatus);
router.delete('/:id', protect, deleteAppointment);

export default router;
