'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email?: string;
  role: string;
  workspaceId?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  registrationEmail: string | null;
  setRegistrationEmail: (email: string | null) => void;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [registrationEmail, setRegistrationEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load auth from localStorage on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('registrationEmail');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    if (storedEmail) {
      setRegistrationEmail(storedEmail);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('registrationEmail');
    router.push('/login');
  };

  const updateRegistrationEmail = (email: string | null) => {
    setRegistrationEmail(email);
    if (email) {
      localStorage.setItem('registrationEmail', email);
    } else {
      localStorage.removeItem('registrationEmail');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      registrationEmail, 
      setRegistrationEmail: updateRegistrationEmail, 
      login, 
      logout,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
