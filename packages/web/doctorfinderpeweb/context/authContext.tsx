// AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

interface AuthContextType {
  isLoggedIn: boolean;
  user: any; 
  login: () => void;
  logout: () => void;
  updateUsername: (newUsername: string) => void;
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
  const router = useRouter()
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
    router.push('/').then(() => {
      localStorage.removeItem('auth-token-doctorfinderpe');
      setUser(null);
      setIsLoggedIn(false);
    });
  }

  const updateUsername = (newUsername: string) => {
    setUser((prevUser: any) => ({ ...prevUser, username: newUsername }));

  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
