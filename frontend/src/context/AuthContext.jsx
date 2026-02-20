import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    api
      .get('/auth/profile')
      .then((response) => setUser(response.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  const login = async (payload, mode = 'login') => {
    const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
    const response = await api.post(endpoint, payload);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
