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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Vytvorenie kontextu pre autentifikáciu
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Pridanie stavu pre chyby

  // Načítanie aktuálneho používateľa pri prvom načítaní komponentu
  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Prihlásenie používateľa
  const login = async (email: string, password: string) => {
    try {
      await axios.post("/api/login", { email, password }, { withCredentials: true });
      const res = await axios.get("/api/me");
      setUser(res.data); // Uloženie používateľa do stavu
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    }
  };

  // Odhlásenie používateľa
  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null); // Vymazanie používateľa
    } catch (err) {
      setError("Failed to log out.");
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook na získanie prístupu k autentifikačnému kontextu
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};