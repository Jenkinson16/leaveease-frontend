import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => localStorage.getItem('authUser'));
  const [role, setRole] = useState(() => localStorage.getItem('authRole'));

  useEffect(() => {
    if (token) localStorage.setItem('authToken', token);
    else localStorage.removeItem('authToken');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('authUser', user);
    else localStorage.removeItem('authUser');
  }, [user]);

  useEffect(() => {
    if (role) localStorage.setItem('authRole', role);
    else localStorage.removeItem('authRole');
  }, [role]);

  const login = useCallback((authToken, username, userRole) => {
    setToken(authToken);
    setUser(username);
    setRole(userRole);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setRole(null);
  }, []);

  const isAuthenticated = Boolean(token);
  const isAdmin = role === 'ADMIN';
  const isEmployee = role === 'EMPLOYEE';

  const value = useMemo(
    () => ({ token, user, role, isAuthenticated, isAdmin, isEmployee, login, logout }),
    [token, user, role, isAuthenticated, isAdmin, isEmployee, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
