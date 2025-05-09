// src/components/player/PlayerDashboard.tsx
"use client";

import CaptainPanel from "./CaptainPanel";
import CombatPanel from "./CombatPanel";

export default function PlayerDashboard({ player }: { player: any | null }) {
  if (!player) {
    return (
      <div className="w-full max-w-6xl mx-auto glassmorphism p-6 sm:p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold neon-glow mb-8 text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto glassmorphism p-6 sm:p-10 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold neon-glow mb-8 text-center">Captain's Overview</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <CaptainPanel player={player} />
        <CombatPanel player={player} />
      </div>
    </div>
  );
}