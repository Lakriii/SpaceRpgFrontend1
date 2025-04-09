import Stat from "./Stat";
import { Player } from "@/types/playerTypes";

interface StatSectionProps {
  title: string;
  stats: { label: string; value: string | number }[];
}

export default function StatSection({ title, stats }: StatSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-blue-300">{title}</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {stats.map((stat, index) => (
          <Stat key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
}
