import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  if (!user) return null;
  return user.role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />;
};

export default DashboardPage;
