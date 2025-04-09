"use client";

import PlayerStats from "@/components/player/PlayerStats";
import StatBox from "@/components/player/StatBox";
import { Player } from "@/types/playerTypes";

export default function CaptainPanel({ player }: { player: Player }) {
  return (
    <div className="flex-1 bg-gray-900 p-6 rounded-lg sci-fi-border min-w-[320px]">
      <h2 className="text-3xl font-bold text-blue-400 text-center">Captain Profile</h2>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <StatBox label="Level" value={player.level} />
        <StatBox label="Class" value={player.class_type ?? "Unknown"} />
      </div>

      <PlayerStats player={player} />
    </div>
  );
}
