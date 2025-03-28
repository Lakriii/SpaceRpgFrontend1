import { useGalaxyStore } from "@/store/useGalaxyStore";

export default function GalaxyDetail() {
  const { selectedObject, selectObject, setZoomLevel, setCenter } = useGalaxyStore();

  if (!selectedObject) return null;

  return (
    <div className="absolute bottom-6 right-6 bg-gray-900 p-6 rounded-lg text-white glassmorphism shadow-lg w-80">
      <h2 className="text-2xl font-bold neon-glow mb-2">{selectedObject.name}</h2>
      <p className="text-sm text-gray-400">Type: {selectedObject.type || "Unknown"}</p>

      {selectedObject.faction && <p className="text-sm text-blue-300">Faction: {selectedObject.faction}</p>}
      {selectedObject.resource_richness && <p className="text-sm text-green-300">Resources: {selectedObject.resource_richness}</p>}
      {selectedObject.population !== undefined && (
        <p className="text-sm text-yellow-300">Population: {selectedObject.population.toLocaleString()}</p>
      )}
      {selectedObject.danger_level && <p className="text-sm text-red-400">Danger Level: {selectedObject.danger_level}</p>}
      {selectedObject.scientific_value && <p className="text-sm text-purple-300">Scientific Value: {selectedObject.scientific_value}</p>}

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 font-bold tracking-wide transition-all"
          onClick={() => {
            if (selectedObject.coordinates_x !== undefined && selectedObject.coordinates_y !== undefined) {
              setZoomLevel(3); 
              setCenter({ x: selectedObject.coordinates_x, y: selectedObject.coordinates_y });
            }
          }}
        >
          Zoom In
        </button>

        {/* Zavretie detailu */}
        <button
          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-bold tracking-wide transition-all"
          onClick={() => selectObject(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}