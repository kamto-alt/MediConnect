import { Link } from 'react-router-dom';

const LandingPage = () => (
  <main className="max-w-6xl mx-auto px-4 py-16">
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <h1 className="text-4xl font-bold mb-4">Hospital operations made easy for African clinics</h1>
      <p className="text-lg text-slate-600 mb-8">
        Register patients, manage appointments, run video consultations, and keep basic medical records in one place.
      </p>
      <div className="flex gap-3">
        <Link to="/auth" className="bg-blue-600 text-white px-5 py-2 rounded font-medium">
          Start using MediConnect Lite
        </Link>
      </div>
    </div>
  </main>
);

export default LandingPage;
