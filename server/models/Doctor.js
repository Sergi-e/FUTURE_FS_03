import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    bio: { type: String, default: '' },
    email: { type: String, trim: true, lowercase: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
