"use client";

import { mockBlackMarket } from "@/data/mockBlackMarket";

export default function BlackMarket() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🚨 Black Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade illegal goods and rare artifacts at your own risk.
      </p>

      <div className="mt-6 grid gap-6">
        {mockBlackMarket.items.map((item, index) => (
          <div key={index} className="glassmorphism p-6 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-red-400">{item.name}</h3>
              <p className="text-gray-300">{item.description}</p>
              <p className="text-yellow-300">💰 {item.price} Credits</p>
              <p className="text-gray-500 text-sm">⚠ High Risk</p>
            </div>
            <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-bold tracking-wide">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}