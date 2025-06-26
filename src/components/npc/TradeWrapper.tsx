import React, { useEffect, useState } from "react";
import Trade from "./Trade";
import { useAuth } from "@/context/AuthContext";

type Player = {
  id: number;
  user_id: number;
  level: number;
};

type Item = {
  id: string;
  name: string;
  description: string;
  iron: number;
  credits: number;
  gold: number;
  rarity: string;
  contentType: string;
  quantity: number;
  price: number;
};

type PlayerResources = Record<string, number>;

type PlayerResourcesResponse = {
  player: Player;
  resources: PlayerResources;
  inventory: Item[];
};

type TradeWrapperProps = {
  itemsForSale: Item[];   // itemsForSale prichádza cez props
};

const TradeWrapper: React.FC<TradeWrapperProps> = ({ itemsForSale }) => {
  const { user, loading } = useAuth();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerResources, setPlayerResources] = useState<PlayerResources>({});
  const [playerInventory, setPlayerInventory] = useState<Item[]>([]);

  useEffect(() => {
    if (!user || loading) return;

    const fetchPlayerData = async () => {
      try {
        const playerRes = await fetch(`/api/playerresources?playerId=${user.id}`);
        if (!playerRes.ok) throw new Error("Failed to fetch player resources");

        const playerData: PlayerResourcesResponse = await playerRes.json();
        setPlayer(playerData.player);
        setPlayerResources(playerData.resources);
        setPlayerInventory(playerData.inventory);
      } catch (error) {
        console.error("Error fetching player data:", error);
        setPlayer(null);
        setPlayerResources({});
        setPlayerInventory([]);
      }
    };

    fetchPlayerData();
  }, [user, loading]);

  if (loading) {
    return <p className="text-gray-300">Loading user info...</p>;
  }

  if (!player) {
    return <p className="text-red-500">Player not found or not logged in.</p>;
  }

  return (
    <Trade
      player={player}
      playerResources={playerResources}
      setPlayerResources={setPlayerResources}
      playerInventory={playerInventory}
      setPlayerInventory={setPlayerInventory}
      itemsForSale={itemsForSale}
    />
  );
};

export default TradeWrapper;
