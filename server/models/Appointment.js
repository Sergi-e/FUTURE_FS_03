import mongoose from 'mongoose';

const departments = [
  'General Medicine',
  'Mental Health',
  'Nutrition',
  'Physiotherapy',
];

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: departments,
    },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
export { departments };
