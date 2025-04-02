// pages/login.tsx

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Form from "@/components/ui/Form";

// Polia formulára pre prihlásenie
const formFields = [
  { id: "username", label: "Username", type: "text" },
  { id: "password", label: "Password", type: "password" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (formData: { [key: string]: string }) => {
    const { username, password } = formData;

    if (username.trim() && password.trim()) {
      login(username, password);
      router.push("/dashboard");
    } else {
      alert("Please fill in both username and password.");
    }
  };

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center">
      <div className="glassmorphism p-10 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Sign In</h1>
        <p className="text-center text-gray-400 mt-2">Log into your account</p>

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
