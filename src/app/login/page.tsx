// pages/login.tsx

"use client";

import { useRouter } from "next/navigation"; // Správne importovanie z next/navigation pre Next.js 13
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Predpokladám, že AuthContext poskytuje useAuth
import Form from "@/components/ui/Form"; // Import formulára zo správneho adresára


// Polia formulára pre prihlásenie
const formFields = [
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (formData: { [key: string]: string }) => {
    const { email, password } = formData;

    if (email.trim() && password.trim()) {
      // Volanie API pre prihlásenie
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
          login(email); // Tu môžeš implementovať vlastnú logiku pre login
          router.push("/dashboard");
        } else {
          setErrorMessage(data.message || "Login failed.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } else {
      setErrorMessage("Please fill in both email and password.");
    }
  };

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center">
      <div className="glassmorphism p-10 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Sign In</h1>
        <p className="text-center text-gray-400 mt-2">Log into your account</p>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {/* Použitie komponenty Form na zobrazenie polí a spracovanie formuláru */}
        <Form formFields={formFields} onSubmit={handleLogin} />

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
