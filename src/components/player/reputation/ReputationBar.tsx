interface ReputationBarProps {
    reputation: number;
  }
  
  export default function ReputationBar({ reputation }: ReputationBarProps) {
    const getReputationLabel = (rep: number) => {
      if (rep >= 80) return "🌟 Galactic Hero";
      if (rep >= 40) return "💎 Honorable Citizen";
      if (rep >= -40) return "⚖️ Neutral";
      if (rep >= -80) return "🔴 Wanted Criminal";
      return "☠️ Dark Overlord";
    };
  
    const getReputationColor = (rep: number) => {
      if (rep >= 80) return "bg-green-500";
      if (rep >= 40) return "bg-blue-500";
      if (rep >= -40) return "bg-gray-500";
      if (rep >= -80) return "bg-orange-500";
      return "bg-red-600";
    };
  
    return (
      <div className="glassmorphism p-4 rounded-lg text-center">
        <p className="text-lg font-bold">{getReputationLabel(reputation)}</p>
        <div className="w-full bg-gray-800 rounded-full h-5 mt-2 relative overflow-hidden">
          <div
            className={`h-full ${getReputationColor(reputation)} transition-all duration-500`}
            style={{ width: `${(reputation + 100) / 2}%` }}
          />
        </div>
        <p className="text-gray-400 mt-2">Reputation: {reputation} / 100</p>
      </div>
    );
  }