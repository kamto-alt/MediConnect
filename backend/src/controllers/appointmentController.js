import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import { generateMeetingLink } from '../utils/generateMeetingLink.js';

export const getDoctors = async (_req, res) => {
  const doctors = await User.find({ role: 'doctor' }).select('name email phone');
  res.json(doctors);
};

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'doctorId, date, and time are required' });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      date,
      time,
      meetingLink: 'pending'
    });

    appointment.meetingLink = generateMeetingLink(appointment._id);
    await appointment.save();

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  const filter = req.user.role === 'doctor' ? { doctorId: req.user._id } : { patientId: req.user._id };
  const appointments = await Appointment.find(filter)
    .populate('patientId', 'name email phone')
    .populate('doctorId', 'name email phone')
    .sort({ date: 1, time: 1 });
  res.json(appointments);
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be accepted or rejected' });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    appointment.status = status;
    await appointment.save();

    return res.json(appointment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
