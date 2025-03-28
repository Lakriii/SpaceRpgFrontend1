"use client";

import { useGalaxyStore } from "@/store/useGalaxyStore";

export default function CurrentLocationPage() {
  const { currentLocation } = useGalaxyStore();

  if (!currentLocation) {
    return (
      <div className="text-center text-2xl font-bold text-red-500 mt-20">
        ❌ No Location Data
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">{currentLocation.name}</h1>
      <p className="text-gray-400 text-center mt-2">{currentLocation.type} - {currentLocation.faction}</p>
      <p className="text-yellow-300 text-center mt-2">Population: {currentLocation.population.toLocaleString()}</p>

      {/* 🌌 Orbiting Objects */}
      {currentLocation.orbiting_objects.length > 0 && (
        <div className="mt-6 glassmorphism p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400">🛰 Orbiting Objects</h3>
          <ul className="text-gray-300">
            {currentLocation.orbiting_objects.map((obj) => (
              <li key={obj.id} className="hover:text-white cursor-pointer">
                {obj.name} ({obj.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}