// components/achievement/AchievementCard.tsx

import { Achievement } from "@/types/achievementTypes"; // Import Achievement typu

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div
      className={`glassmorphism p-4 rounded-lg transition-all ${
        achievement.earned ? "border border-green-400" : "border border-gray-600 opacity-50"
      }`}
    >
      <h3 className={`text-lg font-semibold ${achievement.earned ? "text-green-300" : "text-gray-400"}`}>
        {achievement.earned ? "✅" : "🔒"} {achievement.name}
      </h3>
      <p className="text-sm text-gray-300">{achievement.description}</p>
    </div>
  );
};

export default AchievementCard;
