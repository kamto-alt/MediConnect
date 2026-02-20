import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import medicalRecordRoutes from './routes/medicalRecordRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records', medicalRecordRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB connection failed', error.message);
    process.exit(1);
  });
