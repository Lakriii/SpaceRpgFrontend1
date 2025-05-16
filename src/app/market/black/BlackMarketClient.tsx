"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MarketItem from "@/components/market/MarketItem";

interface MarketItemType {
  marketItemId: number;
  name: string;
  description: string;
  price: number;
  rarity: string;
}

interface Props {
  playerId: number;
}

export default function BlackMarketClient({ playerId }: Props) {
  const [items, setItems] = useState<MarketItemType[]>([]);
  const [playerCredits, setPlayerCredits] = useState(1000);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/market/items/black");
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleBuy = async (itemId: number, price: number) => {
    try {
      const response = await fetch("/api/market/buyItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, itemId, price }),
      });

      const data = await response.json();

      if (data.success) {
        setPlayerCredits((prev) => prev - price);
        toast.success("✅ Purchase successful!");
      } else {
        toast.error(data.message || "❌ Purchase failed.");
      }
    } catch (error) {
      toast.error("❌ Network error");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🚨 Black Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade illegal goods and rare artifacts at your own risk.
      </p>

      <div className="mt-6 grid gap-6">
        {items.map((entry) => (
          <MarketItem
            key={entry.marketItemId}
            id={entry.marketItemId}
            name={entry.name}
            description={entry.description}
            price={entry.price}
            rarity={entry.rarity}
            onBuy={() => handleBuy(entry.marketItemId, entry.price)}
          />
        ))}
      </div>
    </div>
  );
}
