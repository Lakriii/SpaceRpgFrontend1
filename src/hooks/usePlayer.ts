"use client";

import { useState, useEffect } from "react";
import { Player } from "@/types/playerTypes";

export function usePlayer() {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const response = await fetch("/api/player");
        const data = await response.json();
        setPlayer(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    }

    fetchPlayerData();
  }, []);

  return player;
}