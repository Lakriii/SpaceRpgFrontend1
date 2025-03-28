export default function FactionCard({ faction }: { faction: any }) {
    return (
      <div className="p-6 rounded-lg glassmorphism sci-fi-border text-center cursor-pointer transition-all hover:scale-105">
        <h2 className="text-2xl font-bold text-blue-400">{faction.name}</h2>
        <p className="text-sm text-gray-300">{faction.description}</p>
  
        <div className="mt-4">
          <p className="text-green-400">Capital: {faction.capital_system || "Unknown"}</p>
          <p className="text-yellow-300">Controlled Systems: {faction.controlled_systems.length}</p>
        </div>
      </div>
    );
  }