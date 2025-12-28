import { useEffect, useState } from 'react';
import { login as loginApi } from '../api/auth.api';

const AUTH_KEY = 'bookingcare_auth';

export const useAuth = () => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const login = async ({ email, password }) => {
    const res = await loginApi({ email, password });

    const authData = {
      token: res.data.token,
      user: res.data.user
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    setAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuth(null);
  };

  return {
    auth,
    user: auth?.user,
    token: auth?.token,
    isAuthenticated: !!auth,
    login,
    logout
  };
};
