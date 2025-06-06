"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PlayerDashboard from "@/components/player/PlayerDashboard";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (user) {
        const res = await fetch(`/api/player?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setPlayerData(data.player); // Tu dávam rovno player, tak ako to bolo
        }
      }
    };

    fetchPlayer();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading auth...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500 mt-10">You must be logged in to view this page.</div>;
  }

  return <PlayerDashboard player={playerData} />;
}
