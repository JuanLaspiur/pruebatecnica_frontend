"use client"; 
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {useRouter} from '@/i18n/routing'; 
import { login as apiLogin} from "../lib/auth";

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken); // TO DO Verificar si ha expirado
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      setToken(response.token);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };


  useEffect(() => {
    if (!user || !token) {
      logout();
    }
  }, []); 

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };
// To do
  return (
    <AuthContext.Provider value={{ user, token, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
