import Link from "next/link";
import { mockFactions } from "@/data/mockFactions";
import FactionCard from "@/components/factions/FactionCard";

export default function FactionsHub() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockFactions.map((faction) => (
        <Link key={faction.name} href={`/factions/${encodeURIComponent(faction.name)}`}>
          <FactionCard faction={faction} />
        </Link>
      ))}
    </div>
  );
}