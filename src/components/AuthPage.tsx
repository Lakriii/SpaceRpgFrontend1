"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Importujeme AuthContext

export default function AuthPage({ type }: { type: string }) {
  const router = useRouter();
  const { login } = useAuth(); // Získavame login funkciu z kontextu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (type === "login") {
      // Overenie prihlasovacích údajov
      if (email === "123" && password === "123") {
        login(email); // Prihlásenie cez AuthContext
        router.push("/dashboard"); // Presmerovanie na dashboard po prihlásení
      } else {
        alert("Invalid credentials");
      }
    } else if (type === "register") {
      // Uloženie údajov cez AuthContext po registrácii
      login(email);
      alert("Account created successfully!");
      router.push("/dashboard"); // Presmerovanie na dashboard po registrácii
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {type === "login" ? "Login" : "Register"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-all"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {type === "login" ? (
            <>No account? <a href="/register" className="text-blue-500 hover:underline">Register</a></>
          ) : (
            <>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Sign In</a></>
          )}
        </p>
      </div>
    </div>
  );
}
