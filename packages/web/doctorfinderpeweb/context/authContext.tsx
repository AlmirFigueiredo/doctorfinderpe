// AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isLoggedIn: boolean;
  user: any; 
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const token = localStorage.getItem('auth-token-doctorfinderpe');
    if (token) {
      const decoded = jwtDecode(token);
      
      if(decoded.exp) {
        if(Date.now() >= decoded.exp * 1000) {
          logout()
        } else {
          setUser(decoded);
          setIsLoggedIn(true);
        }
      }

      
    }
  }, []);

  const login = () => {
    const token = localStorage.getItem('auth-token-doctorfinderpe');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token-doctorfinderpe');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
