import { validationResult } from 'express-validator';
import Appointment from '../models/Appointment.js';
import {
  sendMail,
  appointmentPatientEmail,
  appointmentAdminEmail,
} from '../utils/sendEmail.js';

export const createAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    const doc = await Appointment.create(req.body);

    try {
      await sendMail({
        to: doc.email,
        subject: 'Novita Health — Appointment received',
        html: appointmentPatientEmail(doc.patientName),
      });
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendMail({
          to: adminEmail,
          subject: `New appointment: ${doc.patientName}`,
          html: appointmentAdminEmail({
            patientName: doc.patientName,
            department: doc.department,
            preferredDate: doc.preferredDate,
            preferredTime: doc.preferredTime,
          }),
        });
      }
    } catch (mailErr) {
      console.error('Appointment email error:', mailErr.message);
    }

    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const doc = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ message: 'Appointment not found' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const doc = await Appointment.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
};
