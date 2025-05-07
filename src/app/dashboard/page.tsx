"use client";


import { useEffect, useState } from "react";
import { db } from "@lib/db/db"; 
import { players } from "@lib/db/schema";
import CaptainPanel from "@/components/player/CaptainPanel";
import CombatPanel from "@/components/player/CombatPanel";

function Profile() {
  const [player, setPlayer] = useState<any | null>(null); 
  const userId = 1; 

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const result = await db.select().from(players).where(players.user_id.eq(userId)).limit(1);
        if (result.length > 0) {
          setPlayer(result[0]); 
        } else {
          console.log("No player data found for the given user ID.");
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, [userId]); 

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

export default Profile;    