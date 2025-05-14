'use client';

// app/market/local/page.tsx
import { getMarketItemsByType } from "@lib/market/getMarketItems"; // Importing Drizzle ORM function
import { useState } from "react";
import  buyItem  from "../../api/market/buyItem";
import toast from "react-hot-toast";
import MarketItem from "@/components/market/MarketItem";


export default async function LocalMarket({ playerId }) {
  const items = await getMarketItemsByType("local");

  const [playerCredits, setPlayerCredits] = useState(1000); // Starting with 1000 credits

  const handleBuy = async (itemId: number, price: number) => {
    try {
      const response = await buyItem(playerId, itemId, price); // Handle the item purchase logic
      if (response.success) {
        setPlayerCredits((prevCredits) => prevCredits - price); // Update credits
        toast.success("✅ Purchase successful!");
      }
    } catch (error) {
      toast.error(error.message || "❌ Purchase failed.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🏪 Local Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Buy and sell goods in the local system.
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
