import { useEffect, useState } from 'react';
import api from '../api/client';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ patientId: '', diagnosis: '', prescription: '', notes: '' });

  const loadData = async () => {
    const [appointmentRes, recordRes] = await Promise.all([api.get('/appointments'), api.get('/records')]);
    setAppointments(appointmentRes.data);
    setRecords(recordRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/appointments/${id}/status`, { status });
    await loadData();
  };

  const addRecord = async (event) => {
    event.preventDefault();
    await api.post('/records', form);
    setForm({ patientId: '', diagnosis: '', prescription: '', notes: '' });
    await loadData();
  };

  const acceptedAppointments = appointments.filter((appt) => appt.status === 'accepted');

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <section className="bg-white border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Today's Schedule</h3>
        <div className="space-y-2">
          {appointments.map((appt) => (
            <div key={appt._id} className="border rounded p-3 text-sm">
              <p><strong>Patient:</strong> {appt.patientId?.name}</p>
              <p><strong>When:</strong> {appt.date} at {appt.time}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              {appt.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(appt._id, 'accepted')}>Accept</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(appt._id, 'rejected')}>Reject</button>
                </div>
              )}
              {appt.status === 'accepted' && (
                <p><strong>Meeting:</strong> <a href={appt.meetingLink} className="text-blue-600" target="_blank">Open Jitsi link</a></p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Add Medical Record</h3>
        <form onSubmit={addRecord} className="grid md:grid-cols-2 gap-2">
          <select className="border rounded p-2" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} required>
            <option value="">Choose patient (accepted appointments)</option>
            {acceptedAppointments.map((appt) => (
              <option key={appt._id} value={appt.patientId?._id}>{appt.patientId?.name}</option>
            ))}
          </select>
          <input className="border rounded p-2" placeholder="Diagnosis" value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} required />
          <input className="border rounded p-2" placeholder="Prescription" value={form.prescription} onChange={(e) => setForm({ ...form, prescription: e.target.value })} required />
          <input className="border rounded p-2" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button className="bg-blue-600 text-white rounded p-2 md:col-span-2">Save record</button>
        </form>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Recent Records</h3>
        <div className="space-y-2">
          {records.map((record) => (
            <div key={record._id} className="border rounded p-3 text-sm">
              <p><strong>Patient:</strong> {record.patientId?.name}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DoctorDashboard;
