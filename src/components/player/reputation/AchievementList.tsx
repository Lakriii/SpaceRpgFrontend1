// components/achievement/AchievementList.tsx

import AchievementCard from "./AchievementCard"; // Import AchievementCard komponenty
import { Achievement } from "@/types/achievementTypes"; // Import Achievement typu

export default function AchievementList({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {achievements.map((ach, index) => (
        <AchievementCard key={index} achievement={ach} /> // Používame AchievementCard komponentu
      ))}
    </div>
  );
}
