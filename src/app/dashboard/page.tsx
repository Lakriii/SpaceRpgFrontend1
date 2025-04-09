"use client";

import { mockPlayer } from "@/data/mockPlayer";
import CaptainPanel from "@/components/player/CaptainPanel";
import CombatPanel from "@/components/player/CombatPanel";

function Profile() {
  const player = mockPlayer;

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

export default Profile;
