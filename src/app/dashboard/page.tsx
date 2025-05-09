// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PlayerDashboard from "@/components/player/PlayerDashboard";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (user) {
        const res = await fetch(`/api/player?userId=${user.id}`);
        const data = await res.json();
        setPlayer(data);
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

  return <PlayerDashboard player={player} />;
}