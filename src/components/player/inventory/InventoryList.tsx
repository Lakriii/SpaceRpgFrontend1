"use client";

import { useEffect, useState } from "react";
import { InventoryItem } from "@/types/inventoryTypes";
import InventoryCard from "./InventoryCard";

interface Props {
  playerId: number;
}

export default function InventoryList({ playerId }: Props) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Načítanie inventára z API pri mountovaní komponentu alebo zmene playerId
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/inventory/${playerId}`);
        if (!res.ok) throw new Error("Failed to fetch inventory");
        const data: InventoryItem[] = await res.json();
        setInventory(data);
      } catch (error) {
        console.error("Error loading inventory:", error);
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [playerId]);

  // Funkcia, ktorú môžeš volať napríklad po úspešnom nákupe na aktualizáciu inventára
  const refreshInventory = async () => {
    try {
      const res = await fetch(`/api/inventory/${playerId}`);
      if (!res.ok) throw new Error("Failed to fetch inventory");
      const data: InventoryItem[] = await res.json();
      setInventory(data);
    } catch (error) {
      console.error("Error refreshing inventory:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400 mt-4">Loading inventory...</p>;
  }

  return inventory.length === 0 ? (
    <p className="text-center text-gray-400 mt-4">Your inventory is empty.</p>
  ) : (
    <div className="grid grid-cols-2 gap-6">
      {inventory.map((item) => {
        // Tu predpokladám, že na serveri vraciaš kompletné info o položke vrátane dát, ktoré potrebuješ
        // Ak máš len ID, môžeš ešte dotiahnuť ďalšie info ako predtým z mockItems
        return <InventoryCard key={item.object_id} item={item} itemData={item} />;
      })}
    </div>
  );
}
