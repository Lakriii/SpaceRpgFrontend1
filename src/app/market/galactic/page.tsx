"use client";

import { mockGalacticMarket } from "@/data/mockGalacticMarket"; // Importujeme nový mock dát
import MarketItem from "@/components/market/MarketItem";


export default function GalacticMarket() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🌌 Galactic Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade goods across the galaxy. Orders may take time to arrive.
      </p>

      <div className="mt-6 grid gap-6">
        {mockGalacticMarket.items.map((item) => (
          <MarketItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            delivery_time={item.delivery_time}
          />
        ))}
      </div>
    </div>
  );
}



