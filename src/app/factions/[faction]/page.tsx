"use client";

import { useParams } from "next/navigation";
import { mockFactions } from "@/data/mockFactions"; // Predpokladáme, že existuje tento súbor s mockovanými frakciami
import DiplomacyActions from "@/components/factions/DiplomacyActions"; // Predpokladáme, že tento komponent existuje

export default function FactionPage() {
  const { faction } = useParams();
  const factionData = mockFactions.find((f) => f.name === decodeURIComponent(faction));

  // Ak frakcia neexistuje, zobraziť správu o chybe
  if (!factionData) {
    return (
      <div className="text-center text-2xl font-bold text-red-500 mt-20">
        🚀 Faction Not Found
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      {/* Názov frakcie */}
      <h1 className="text-4xl font-extrabold neon-glow text-center">{factionData.name}</h1>
      <p className="text-gray-400 text-center mt-2">{factionData.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Hlavné informácie o frakcii */}
        <div className="glassmorphism p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400">🏛 Capital System</h3>
          <p className="text-gray-300">{factionData.capital_system || "Unknown"}</p>
        </div>
        <div className="glassmorphism p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400">🌍 Controlled Systems</h3>
          <p className="text-gray-300">{factionData.controlled_systems.join(", ") || "None"}</p>
        </div>
      </div>

      {/* 🔄 Diplomacy Actions */}
      <DiplomacyActions faction={factionData} />

      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Aliancie */}
        <div className="glassmorphism p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400">🤝 Allies</h3>
          <p className="text-gray-300">{factionData.allies.join(", ") || "None"}</p>
        </div>
        {/* Nepátele */}
        <div className="glassmorphism p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-400">⚔️ Enemies</h3>
          <p className="text-gray-300">{factionData.enemies.join(", ") || "None"}</p>
        </div>
      </div>
    </div>
  );
}
