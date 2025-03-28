"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = () => {
    if (username.trim()) {
      login({ name: username });
      router.push("/dashboard");
    }
  };

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center">
      <div className="glassmorphism p-10 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Join the Galaxy</h1>
        <p className="text-center text-gray-400 mt-2">Create your account and begin your journey</p>

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mt-6 p-3 rounded bg-gray-900 text-white border border-blue-500"
        />

        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 py-3 rounded text-lg font-semibold"
        >
          Register
        </button>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </main>
  );
}