import MedicalRecord from '../models/MedicalRecord.js';

export const addMedicalRecord = async (req, res) => {
  try {
    const { patientId, diagnosis, prescription, notes } = req.body;
    if (!patientId || !diagnosis || !prescription) {
      return res.status(400).json({ message: 'patientId, diagnosis, prescription are required' });
    }

    const record = await MedicalRecord.create({
      patientId,
      doctorId: req.user._id,
      diagnosis,
      prescription,
      notes
    });

    return res.status(201).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRecords = async (req, res) => {
  const query = req.user.role === 'doctor' ? { doctorId: req.user._id } : { patientId: req.user._id };
  const records = await MedicalRecord.find(query)
    .populate('patientId', 'name email')
    .populate('doctorId', 'name email')
    .sort({ date: -1 });
  res.json(records);
};
