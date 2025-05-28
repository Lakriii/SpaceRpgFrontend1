"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Definovanie typu pre používateľa
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Typ pre autentifikačný kontext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Vytvorenie kontextu pre autentifikáciu
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Načítanie používateľa po načítaní stránky
  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true }) // ✅ cookie potrebná
      .then((res) => setUser(res.data))          // ✅ res.data JE objekt User
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Prihlásenie
  const login = async (email: string, password: string) => {
    try {
      await axios.post("/api/login", { email, password }, { withCredentials: true });
      const res = await axios.get("/api/me", { withCredentials: true });
      setUser(res.data);
      setError(null); // reset chýb
    } catch (err: any) {
      setError("Failed to log in. Please check your credentials.");
      console.error("❌ Login error:", err?.response?.data || err.message);
    }
  };

  // Odhlásenie
  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
      setError(null);
    } catch (err: any) {
      setError("Failed to log out.");
      console.error("❌ Logout error:", err?.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook na získanie kontextu
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};