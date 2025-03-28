"use client";

import { mockLocalMarket } from "@/data/mockLocalMarket";

export default function LocalMarket() {
  if (!mockLocalMarket || !mockLocalMarket.items) {
    return (
      <div className="text-center text-red-500 text-xl font-bold mt-10">
        ⚠️ No market data available.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🏪 Local Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Buy and sell goods in the local system.
      </p>

      <div className="mt-6 grid gap-6">
        {mockLocalMarket.items.map((item) => (
          <div key={item.id} className="glassmorphism p-6 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-400">{item.name}</h3>
              <p className="text-gray-300">{item.description}</p>
              <p className="text-yellow-300 text-lg font-bold">💰 {item.price} Credits</p>
            </div>
            <button className="px-6 py-3 rounded-full neon-button transition-all hover:scale-105">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}