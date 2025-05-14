// app/market/black/page.tsx
import { getMarketItemsByType } from "@lib/market/getMarketItems";
import { buyItem } from "@lib/market/buyItem";
import { useState } from "react";
import toast from "react-hot-toast";
import MarketItem from "@/components/market/MarketItem";

export default async function BlackMarket({ playerId }) {
  const items = await getMarketItemsByType("black");

  const [playerCredits, setPlayerCredits] = useState(1000); // Začiatok s 1000 kreditmi

  const handleBuy = async (itemId: number, price: number) => {
    try {
      const response = await buyItem(playerId, itemId, price);
      if (response.success) {
        setPlayerCredits((prevCredits) => prevCredits - price); // Aktualizujeme kredity
        toast.success("✅ Purchase successful!");
      }
    } catch (error) {
      toast.error(error.message || "❌ Purchase failed.");
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
            key={entry.id}
            name={entry.name}
            description={entry.description}
            price={entry.price}
            rarity={entry.rarity}
            playerCredits={playerCredits}
            onBuy={() => handleBuy(entry.id, entry.price)}
          />
        ))}
      </div>
    </div>
  );
}
