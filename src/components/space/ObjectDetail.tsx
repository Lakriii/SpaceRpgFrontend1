"use client";

import { useGalaxyStore } from "@/store/useGalaxyStore";

export default function ObjectDetail() {
  const { selectedObject } = useGalaxyStore();

  if (!selectedObject) return null;

  return (
    <div className="absolute top-10 right-10 bg-gray-900 p-6 rounded-lg shadow-lg text-white w-72">
      <h2 className="text-xl font-bold">{selectedObject.name}</h2>
      <p className="text-blue-400">{selectedObject.object_type || "Unknown Type"}</p>
      <p className="text-sm mt-2">Faction: {selectedObject.faction || "Neutral"}</p>
      <p className="text-sm">Coordinates: {selectedObject.coordinates_x}, {selectedObject.coordinates_y}, {selectedObject.coordinates_z}</p>
      <button className="mt-4 w-full btn-primary" onClick={() => useGalaxyStore.setState({ selectedObject: null })}>
        Close
      </button>
    </div>
  );
}