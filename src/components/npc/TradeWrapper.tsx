import React, { useEffect, useState } from "react";
import Trade from "./Trade";
import { Item } from "@/types/Item";
import { useAuth } from "@/context/AuthContext";

type Player = {
  id: number;
  user_id: number;
  level: number;
  // další pole pokud chceš
};

type Resources = Record<string, number>;

type PlayerResourcesResponse = {
  player: Player;
  resources: Resources;
  inventory: Item[];
};

type TradeWrapperProps = {
  itemsForSale: Item[];
};

const TradeWrapper: React.FC<TradeWrapperProps> = ({ itemsForSale }) => {
  const { user, loading } = useAuth();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerResources, setPlayerResources] = useState<Resources>({});
  const [playerInventory, setPlayerInventory] = useState<Item[]>([]);

  useEffect(() => {
    if (!user || loading) return;

    const fetchResources = async () => {
      try {
        const res = await fetch(`/api/playerresources?playerId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data: PlayerResourcesResponse = await res.json();

        setPlayer(data.player ?? null);
        setPlayerResources(data.resources ?? {});
        setPlayerInventory(data.inventory ?? []);
      } catch (error) {
        console.error("Error fetching player resources:", error);
        setPlayer(null);
        setPlayerResources({});
        setPlayerInventory([]);
      }
    };

    fetchResources();
  }, [user, loading]);

  if (loading || player === null) {
    return <p className="text-gray-300">Loading resources...</p>;
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
