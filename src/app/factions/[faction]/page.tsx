"use client";

import { useParams } from "next/navigation";
import { mockFactions } from "@/data/mockFactions";
import DiplomacyActions from "@/components/factions/DiplomacyActions";
import FactionInfoCard from "@/components/factions/FactionInfoCard"; // <- nový import

export default function FactionPage() {
  const { faction } = useParams();
  const factionData = mockFactions.find((f) => f.name === decodeURIComponent(faction));

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
        <FactionInfoCard
          title="🏛 Capital System"
          color="text-blue-400"
          data={factionData.capital_system}
          fallback="Unknown"
        />
        <FactionInfoCard
          title="🌍 Controlled Systems"
          color="text-green-400"
          data={factionData.controlled_systems}
          fallback="None"
        />
      </div>

      {/* 🔄 Diplomacy Actions */}
      <DiplomacyActions faction={factionData} />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <FactionInfoCard
          title="🤝 Allies"
          color="text-yellow-400"
          data={factionData.allies}
          fallback="None"
        />
        <FactionInfoCard
          title="⚔️ Enemies"
          color="text-red-400"
          data={factionData.enemies}
          fallback="None"
        />
      </div>
    </div>
  );
}
