"use client";

interface FactionRelationsProps {
  faction: {
    allies: string[];
    enemies: string[];
  };
}

export default function FactionRelations({ faction }: FactionRelationsProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-400">🤝 Allies</h3>
        <p className="text-gray-300">{faction.allies.join(", ") || "None"}</p>
      </div>
      <div className="glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400">⚔️ Enemies</h3>
        <p className="text-gray-300">{faction.enemies.join(", ") || "None"}</p>
      </div>
    </div>
  );
}
