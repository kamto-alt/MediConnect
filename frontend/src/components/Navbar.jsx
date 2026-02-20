import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-blue-600">
          MediConnect Lite
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.name} ({user.role})</span>
              <button onClick={logout} className="px-3 py-1 rounded bg-slate-900 text-white text-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-blue-600 font-medium">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
