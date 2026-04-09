import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'novita_token';
const ADMIN_KEY = 'novita_admin';

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdminState] = useState(() => {
    try {
      const raw = localStorage.getItem(ADMIN_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const setAuth = useCallback((newToken, adminPayload) => {
    if (newToken) localStorage.setItem(TOKEN_KEY, newToken);
    else localStorage.removeItem(TOKEN_KEY);
    setTokenState(newToken || null);
    if (adminPayload) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(adminPayload));
      setAdminState(adminPayload);
    } else {
      localStorage.removeItem(ADMIN_KEY);
      setAdminState(null);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setTokenState(null);
    setAdminState(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token),
      setAuth,
      logout,
    }),
    [token, admin, setAuth, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
