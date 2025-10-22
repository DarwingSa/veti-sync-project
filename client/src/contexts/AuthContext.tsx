
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define la forma del objeto de usuario y el contexto de autenticación
interface User {
  id: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

// Crea el contexto con un valor inicial undefined para detectar si se usa fuera del proveedor
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el componente Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        // Decodifica el token para obtener la información del usuario sin verificar la firma
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setUser(decoded.user as User);
        setToken(storedToken);
      } catch (error) {
        console.error('Error decodificando el token:', error);
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    try {
      const decoded = JSON.parse(atob(newToken.split('.')[1]));
      setUser(decoded.user as User);
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      router.push('/pacientes'); // Redirige a la página principal de la app tras el login
    } catch (error) {
      console.error('Error decodificando el token en login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/login'); // Redirige a la página de login
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
