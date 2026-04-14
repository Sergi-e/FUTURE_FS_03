import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';

const signToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = signToken(admin._id.toString(), admin.email);
    res.json({
      token,
      admin: { email: admin.email, name: admin.name },
    });
  } catch (e) {
    next(e);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('email name');
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }
    return res.json({ admin: { email: admin.email, name: admin.name } });
  } catch (e) {
    return next(e);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { name, email } = req.body;
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Admin.findOne({ email: normalizedEmail, _id: { $ne: admin._id } });
    if (existing) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    admin.name = name.trim();
    admin.email = normalizedEmail;
    await admin.save();

    return res.json({
      message: 'Profile updated successfully',
      admin: { email: admin.email, name: admin.name },
    });
  } catch (e) {
    return next(e);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    const isCurrentValid = await admin.comparePassword(currentPassword);
    if (!isCurrentValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different' });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (e) {
    return next(e);
  }
};
