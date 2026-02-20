import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not configured');
  }

  await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB || 'mediconnect_lite' });
  console.log('✅ MongoDB connected');
};
