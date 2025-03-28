"use client";

export default function MiningPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">⛏ Mining Operations</h1>
      <p className="text-gray-400 text-center mt-2">Extract valuable resources from asteroids and planets.</p>

      <div className="mt-6 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-400">🚀 Resource Extraction</h3>
        <p className="text-gray-300">Harvest minerals and trade for profit.</p>
      </div>

      <div className="mt-4 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400">⚒ Mining Upgrades</h3>
        <p className="text-gray-300">Improve efficiency with better drills and tools.</p>
      </div>
    </div>
  );
}