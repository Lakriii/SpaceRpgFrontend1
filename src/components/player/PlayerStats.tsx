import Stat from "./Stat";
import { Player } from "@/types/playerTypes";

export default function PlayerStats({ player }: { player: Player }) {
  return (
    <div className="glassmorphism p-8 rounded-xl shadow-2xl w-full mt-6 border border-blue-500/20 relative">
      {/* 💠 Animovaná žiariaca línia */}
      <div className="absolute inset-0 w-full h-full border border-blue-500/30 rounded-xl animate-glow"></div>

      <h3 className="text-2xl font-bold neon-glow text-center tracking-wide">🛡 Player Stats</h3>

      {/* 🚀 Grid pre štatistiky */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Stat label="❤️ HP" value={`${player.hp} / ${player.max_hp}`} />
        <Stat label="⚡ Energy" value={`${player.energy} / ${player.max_energy}`} />
        <Stat label="💪 Strength" value={player.strength} />
        <Stat label="🛡 Defense" value={player.defense} />
        <Stat label="🏃 Agility" value={player.agility} />
        <Stat label="🎯 Luck" value={player.luck} />
        <Stat label="🧠 Intelligence" value={player.intelligence} />
        <Stat label="🔥 Stamina" value={player.stamina} />
      </div>
    </div>
  );
}