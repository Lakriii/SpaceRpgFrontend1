"use client";

interface FactionDetailsProps {
  faction: {
    capital_system: string;
    controlled_systems: string[];
  };
}

export default function FactionDetails({ faction }: FactionDetailsProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-400">🏛 Capital System</h3>
        <p className="text-gray-300">{faction.capital_system || "Unknown"}</p>
      </div>
      <div className="glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-400">🌍 Controlled Systems</h3>
        <p className="text-gray-300">{faction.controlled_systems.join(", ") || "None"}</p>
      </div>
    </div>
  );
}
