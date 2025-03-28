"use client";

import { useState } from "react";
import { mockReputation } from "@/data/mockReputation";
import ReputationBar from "@/components/player/reputation/ReputationBar";
import AchievementList from "@/components/player/reputation/AchievementList";

export default function PlayerReputation() {
  const [reputation, setReputation] = useState(mockReputation.playerReputation);
  const [achievements, setAchievements] = useState(mockReputation.achievements);

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🌟 Player Reputation</h1>
      <p className="text-gray-400 text-center mt-2">
        Your reputation affects how factions and NPCs interact with you.
      </p>

      {/* 🔵 Reputation Indicator */}
      <div className="mt-6">
        <ReputationBar reputation={reputation} />
      </div>

      {/* 🏆 Achievements */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-400 text-center">🏆 Achievements</h2>
        <AchievementList achievements={achievements} />
      </div>
    </div>
  );
}