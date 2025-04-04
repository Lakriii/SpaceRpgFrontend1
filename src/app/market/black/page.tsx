"use client";

import { mockBlackMarket } from "@/data/mockBlackMarket"; // Importujeme nový mock dát
import MarketItem from "@/components/market/MarketItem";


export default function BlackMarket() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🚨 Black Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade illegal goods and rare artifacts at your own risk.
      </p>

      <div className="mt-6 grid gap-6">
        {mockBlackMarket.items.map((item) => (
          <MarketItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
