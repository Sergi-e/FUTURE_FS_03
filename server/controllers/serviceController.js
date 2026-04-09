import { validationResult } from 'express-validator';
import Service from '../models/Service.js';

export const getServices = async (req, res, next) => {
  try {
    const list = await Service.find({ active: true }).sort({ title: 1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const list = await Service.find().sort({ title: 1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const createService = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const doc = await Service.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const doc = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: 'Service not found' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const doc = await Service.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
};
