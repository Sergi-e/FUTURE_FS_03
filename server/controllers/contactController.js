import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';

export const createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const doc = await Contact.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const markContactRead = async (req, res, next) => {
  try {
    const doc = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Message not found' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};
