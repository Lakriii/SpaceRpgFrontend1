"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ReputationBar from "@/components/player/reputation/ReputationBar";
import AchievementList from "@/components/player/reputation/AchievementList";

interface Achievement {
  name: string;
  description: string;
  earned: boolean;
}

export default function PlayerReputation() {
  const { user, loading } = useAuth();
  const [reputation, setReputation] = useState<number | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchReputation = async () => {
      if (!user) return;
      try {
        const res = await fetch("/api/player/reputation");
        const data = await res.json();
        setReputation(data.reputation);
        setAchievements(data.achievements);
      } catch (error) {
        console.error("Error loading player reputation:", error);
      }
    };

    fetchReputation();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading user...</div>;
  }

  if (!user) {
    return <div className="text-red-500 text-center mt-10">You must be logged in.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🌟 Player Reputation</h1>
      <p className="text-gray-400 text-center mt-2">
        Your reputation affects how factions and NPCs interact with you.
      </p>

      {reputation !== null && (
        <div className="mt-6">
          <ReputationBar reputation={reputation} />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-400 text-center">🏆 Achievements</h2>
        <AchievementList achievements={achievements} />
      </div>
    </div>
  );
}