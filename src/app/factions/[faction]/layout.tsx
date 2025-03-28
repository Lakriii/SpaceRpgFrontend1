"use client";

import { useRouter, useParams } from "next/navigation";
import { mockFactions } from "@/data/mockFactions";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const selectedFaction = decodeURIComponent(params.faction || "");

  return (
    <div className="w-full min-h-screen flex bg-black text-white">
      {/* 🏛 Sidebar */}
      <aside className="w-[300px] min-w-[250px] bg-gray-900 glassmorphism sci-fi-border p-6 flex-shrink-0">
        <h2 className="text-xl font-bold neon-glow mb-4">Factions</h2>
        <ul className="space-y-2">
          {mockFactions.map((f) => (
            <li key={f.name}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  f.name === selectedFaction ? "bg-blue-500 text-white" : "hover:bg-gray-800"
                }`}
                onClick={() => router.push(`/factions/${encodeURIComponent(f.name)}`)}
              >
                {f.name}
              </button>
            </li>
          ))}
        </ul>

        {/* 🔙 Back Button */}
        <button
          className="mt-6 px-4 py-2 w-full rounded bg-red-500 hover:bg-red-600 font-bold tracking-wide transition-all"
          onClick={() => router.push("/factions")}
        >
          ← Back to Factions Hub
        </button>
      </aside>

      {/* 🌌 Hlavný obsah */}
      <main className="flex-1 w-full p-8 glassmorphism sci-fi-border">
        {children}
      </main>
    </div>
  );
}