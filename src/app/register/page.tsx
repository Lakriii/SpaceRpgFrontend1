// pages/register.tsx

"use client";

import { useRouter } from "next/navigation";
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

  const handleRegister = (formData: { [key: string]: string }) => {
    const { username, email, password, confirmPassword } = formData;

    if (username.trim() && email.trim() && password === confirmPassword) {
      login({ name: username });
      router.push("/dashboard");
    } else {
      alert("Please check your inputs and try again.");
    }
  };

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center">
      <div className="glassmorphism p-10 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Join the Galaxy</h1>
        <p className="text-center text-gray-400 mt-2">Create your account and begin your journey</p>

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
