"use client";

import { useState } from "react";
import GalaxyMap from "@/components/space/GalaxyMap";
import Navigation from "@/components/space/Navigation";

export default function SpacePage() {
  const [selectedSystem, setSelectedSystem] = useState(null);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-4xl font-extrabold neon-glow text-center mb-6">🌌 Galactic Map</h1>

      <div className="flex flex-1">
        <GalaxyMap onSelectSystem={setSelectedSystem} />

        {selectedSystem && (
          <aside className="w-96 bg-gray-900 glassmorphism p-6 sci-fi-border">
            <h2 className="text-2xl font-bold text-blue-400">{selectedSystem.name}</h2>
            <p className="text-gray-300">Faction: {selectedSystem.faction || "Unclaimed"}</p>
            <p className="text-gray-300">Coordinates: ({selectedSystem.coordinates_x}, {selectedSystem.coordinates_y}, {selectedSystem.coordinates_z})</p>

            <Navigation system={selectedSystem} />
          </aside>
        )}
      </div>
    </div>
  );
}