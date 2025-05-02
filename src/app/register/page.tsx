// pages/register.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Form from "@/components/ui/Form";

// Zoznam polí pre formulár
const formFields = [
  { id: "username", label: "Choose a username", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (formData: { [key: string]: string }) => {
    const { username, email, password, confirmPassword } = formData;

    if (username.trim() && email.trim() && password === confirmPassword && password.trim()) {
      // Volanie API pre registráciu
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, email, password }),
        });

        const data = await response.json();

        if (data.success) {
          login(username); // Tu môžeš implementovať vlastnú logiku pre login po registrácii
          router.push("/dashboard");
        } else {
          setErrorMessage(data.message || "Registration failed.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again later.");
        console.error(error); // Logovanie chyby
      }
    } else {
      setErrorMessage("Please check your inputs and try again.");
    }
  };

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center">
      <div className="glassmorphism p-10 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Join the Galaxy</h1>
        <p className="text-center text-gray-400 mt-2">Create your account and begin your journey</p>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {/* Použitie komponenty Form */}
        <Form formFields={formFields} onSubmit={handleRegister} />

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
