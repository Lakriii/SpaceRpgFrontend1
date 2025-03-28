"use client";

import { mockGalacticMarket } from "@/data/mockGalacticMarket";

export default function GalacticMarket() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🌌 Galactic Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade goods across the galaxy. Orders may take time to arrive.
      </p>

      <div className="mt-6 grid gap-6">
        {mockGalacticMarket.items.map((item) => (
          <div key={item.id} className="glassmorphism p-6 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-green-400">{item.name}</h3>
              <p className="text-gray-300">{item.description}</p>
              <p className="text-yellow-300 text-lg font-bold">💰 {item.price} Credits</p>
              <p className="text-gray-400 text-sm">⏳ Delivery Time: {item.delivery_time} cycles</p>
            </div>
            <button className="px-6 py-3 rounded-full neon-button transition-all hover:scale-105">
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}