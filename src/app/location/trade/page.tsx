"use client";

export default function TradePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">🛒 Trade Hub</h1>
      <p className="text-gray-400 text-center mt-2">Exchange resources, buy items, and trade with NPCs.</p>

      <div className="mt-6 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-400">💰 Market Prices</h3>
        <p className="text-gray-300">Dynamic economy with fluctuating prices.</p>
      </div>

      <div className="mt-4 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-400">📦 Available Goods</h3>
        <p className="text-gray-300">Check available items and resources.</p>
      </div>
    </div>
  );
}