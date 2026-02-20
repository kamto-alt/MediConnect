import { Router } from 'express';
import { addMedicalRecord, getRecords } from '../controllers/medicalRecordController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, authorize('doctor'), addMedicalRecord);
router.get('/', protect, getRecords);

export default router;
