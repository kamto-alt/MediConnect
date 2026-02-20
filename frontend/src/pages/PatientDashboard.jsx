import { useEffect, useState } from 'react';
import api from '../api/client';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ doctorId: '', date: '', time: '' });

  const loadData = async () => {
    const [doctorRes, appointmentRes, recordRes] = await Promise.all([
      api.get('/appointments/doctors'),
      api.get('/appointments'),
      api.get('/records')
    ]);
    setDoctors(doctorRes.data);
    setAppointments(appointmentRes.data);
    setRecords(recordRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const bookAppointment = async (event) => {
    event.preventDefault();
    await api.post('/appointments', form);
    setForm({ doctorId: '', date: '', time: '' });
    await loadData();
  };

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <section className="bg-white border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Book Appointment</h3>
        <form onSubmit={bookAppointment} className="grid md:grid-cols-4 gap-2">
          <select className="border rounded p-2" value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} required>
            <option value="">Select doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
            ))}
          </select>
          <input className="border rounded p-2" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <input className="border rounded p-2" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
          <button className="bg-blue-600 text-white rounded p-2">Book</button>
        </form>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">My Appointments</h3>
        <div className="space-y-2">
          {appointments.map((appt) => (
            <div key={appt._id} className="border rounded p-3 text-sm">
              <p><strong>Doctor:</strong> {appt.doctorId?.name}</p>
              <p><strong>When:</strong> {appt.date} at {appt.time}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p><strong>Meeting:</strong> <a className="text-blue-600" href={appt.meetingLink} target="_blank">Join consultation</a></p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Medical History</h3>
        <div className="space-y-2">
          {records.map((record) => (
            <div key={record._id} className="border rounded p-3 text-sm">
              <p><strong>Doctor:</strong> {record.doctorId?.name}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
              <a
                className="text-blue-600"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(`Prescription\n\n${record.prescription}`)}`}
                download={`prescription-${record._id}.txt`}
              >
                Download prescription
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PatientDashboard;
