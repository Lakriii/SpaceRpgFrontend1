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

export default function LocalMarketClient({ playerId }: Props) {
  const [items, setItems] = useState<MarketItemType[]>([]);
  const [playerCredits, setPlayerCredits] = useState(1000);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/market/items/local");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        toast.error("Error loading market items");
      }
    };

    fetchItems();
  }, []);

  const handleBuy = async (itemId: number, price: number) => {
    try {
      console.log("Buying item:", itemId, "for price:", price);

      const res = await fetch("/api/market/buyItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, itemId, price }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.log("Error response:", errData);
        toast.error(errData.message || "❌ Purchase failed");
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (data.success) {
        setPlayerCredits((prev) => prev - price);
        toast.success("✅ Purchase successful!");
      } else {
        toast.error(data.message || "❌ Purchase failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Network error");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🏪 Local Market</h1>
      <p className="text-gray-400 text-center mt-2">Buy and sell goods in the local system.</p>
      <p className="text-yellow-300 text-center mt-2">Credits: {playerCredits}</p>

      <div className="mt-6 grid gap-6">
        {items.length === 0 && (
          <p className="text-center text-gray-400">No items available at the moment.</p>
        )}
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
