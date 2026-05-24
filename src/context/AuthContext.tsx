import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User } from '../types/auth';
import { authApi } from '../api/authApi';
import { clearStoredToken, getStoredToken, persistToken } from '../utils/authStorage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clearAuthState = useCallback(() => {
    clearStoredToken();
    setUser(null);
  }, []);

  const fetchUser = useCallback(async (): Promise<User | null> => {
    const token = getStoredToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const response = await authApi.getMyInfo();
      setUser(response.result);
      return response.result;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      clearAuthState();
      return null;
    } finally {
      setLoading(false);
    }
  }, [clearAuthState]);

  useEffect(() => {
    fetchUser();

    const handleUnauthorized = () => {
      clearAuthState();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [clearAuthState, fetchUser]);

  const login = async (token: string) => {
    persistToken(token);

    const authenticatedUser = await fetchUser();
    if (!authenticatedUser) {
      throw new Error('Unable to authenticate user');
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Logout API failed, continuing local cleanup', error);
    } finally {
      clearAuthState();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
