"use client"; 

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="mt-6 px-6 py-2 rounded-full text-white font-bold tracking-wider neon-button transition-all hover:scale-105"
      onClick={() => router.back()} 
    >
      ← Back to Fleet
    </button>
  );
}