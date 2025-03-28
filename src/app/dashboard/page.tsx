"use client";

import { mockPlayer } from "@/data/mockPlayer";
import PlayerStats from "@/components/player/PlayerStats";
import PlayerProgress from "@/components/player/PlayerProgress";
import PlayerCombat from "@/components/player/PlayerCombat";
import PlayerEquipment from "@/components/player/PlayerEquipment";
import StatBox from "@/components/player/StatBox";



function Profile() {
  const player = mockPlayer;

  return (

    <div className="w-4/5 mx-auto glassmorphism p-10 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold neon-glow mb-8 text-center">Captain's Overview</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* 🏆 Left Panel - Basic Info & Stats */}
        <div className="bg-gray-900 p-6 rounded-lg sci-fi-border">
          <h2 className="text-3xl font-bold text-blue-400 text-center">Captain Profile</h2>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <StatBox label="Level" value={player.level} />
            <StatBox label="Class" value={player.class_type ?? "Unknown"} />
          </div>

          <PlayerStats player={player} />
        </div>

        {/* 🚀 Right Panel - Combat & Equipment */}
        <div className="bg-gray-900 p-6 rounded-lg sci-fi-border">
          <PlayerCombat player={player} />
          <PlayerEquipment player={player} />
          <PlayerProgress player={player} />
        </div>
      </div>
    </div>
      
  );
}

export default Profile;