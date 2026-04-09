import { validationResult } from 'express-validator';
import Doctor from '../models/Doctor.js';

export const getDoctors = async (req, res, next) => {
  try {
    const list = await Doctor.find({ available: true }).sort({ name: 1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const getAllDoctorsAdmin = async (req, res, next) => {
  try {
    const list = await Doctor.find().sort({ name: 1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const createDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const doc = await Doctor.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
};
