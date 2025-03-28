interface Achievement {
    name: string;
    description: string;
    earned: boolean;
  }
  
  export default function AchievementList({ achievements }: { achievements: Achievement[] }) {
    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {achievements.map((ach, index) => (
          <div
            key={index}
            className={`glassmorphism p-4 rounded-lg transition-all ${
              ach.earned ? "border border-green-400" : "border border-gray-600 opacity-50"
            }`}
          >
            <h3 className={`text-lg font-semibold ${ach.earned ? "text-green-300" : "text-gray-400"}`}>
              {ach.earned ? "✅" : "🔒"} {ach.name}
            </h3>
            <p className="text-sm text-gray-300">{ach.description}</p>
          </div>
        ))}
      </div>
    );
  }