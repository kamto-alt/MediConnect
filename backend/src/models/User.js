import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor'], required: true },
    age: Number,
    gender: String,
    phone: String,
    address: String,
    medicalHistory: String
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
