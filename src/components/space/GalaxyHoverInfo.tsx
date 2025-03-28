import { useGalaxyStore } from "@/store/useGalaxyStore";

export default function GalaxyHoverInfo() {
  const { hoveredObject } = useGalaxyStore();

  if (!hoveredObject) return null;

  return (
    <div className="absolute top-4 left-4 bg-gray-800 p-3 rounded-lg text-white">
      <p className="font-bold">{hoveredObject.name}</p>
      <p className="text-sm">Type: {hoveredObject.object_type || "Unknown"}</p>
    </div>
  );
}