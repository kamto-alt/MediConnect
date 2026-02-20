import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  role: 'patient',
  age: '',
  gender: '',
  phone: '',
  address: '',
  medicalHistory: ''
};

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form, mode);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
        <h2 className="text-2xl font-semibold">{mode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {mode === 'register' && (
          <input className="w-full border p-2 rounded" placeholder="Full name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {mode === 'register' && (
          <>
            <select className="w-full border p-2 rounded" onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input className="border p-2 rounded" placeholder="Age" onChange={(e) => setForm({ ...form, age: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Gender" onChange={(e) => setForm({ ...form, gender: e.target.value })} />
            </div>
            <input className="w-full border p-2 rounded" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="w-full border p-2 rounded" placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <textarea className="w-full border p-2 rounded" placeholder="Medical history" onChange={(e) => setForm({ ...form, medicalHistory: e.target.value })} />
          </>
        )}
        <button className="w-full bg-blue-600 text-white rounded p-2 font-medium" type="submit">
          {mode === 'login' ? 'Login' : 'Create account'}
        </button>
        <button type="button" className="text-sm text-blue-600" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </main>
  );
};

export default AuthPage;
