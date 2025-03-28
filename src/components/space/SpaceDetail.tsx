import { useGalaxyStore } from "@/store/useGalaxyStore";

export default function GalaxyDetail() {
  const { selectedObject, selectObject } = useGalaxyStore();

  if (!selectedObject) return null;

  return (
    <div className="absolute bottom-4 right-4 bg-gray-900 p-4 rounded-lg text-white glassmorphism">
      <h2 className="text-xl font-bold neon-glow">{selectedObject.name}</h2>
      <p className="text-sm">Type: {selectedObject.type || "Unknown"}</p>

      {selectedObject.faction && <p className="text-sm">Faction: {selectedObject.faction}</p>}
      {selectedObject.resource_richness && <p className="text-sm">Resources: {selectedObject.resource_richness}</p>}

      <button
        className="mt-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600"
        onClick={() => selectObject(null)}
      >
        Close
      </button>
    </div>
  );
}