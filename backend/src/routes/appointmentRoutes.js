import { Router } from 'express';
import {
  createAppointment,
  getDoctors,
  getMyAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/doctors', protect, getDoctors);
router.post('/', protect, authorize('patient'), createAppointment);
router.get('/', protect, getMyAppointments);
router.patch('/:id/status', protect, authorize('doctor'), updateAppointmentStatus);

export default router;
