"use client";

import StatSection from "@/components/player/StatSection"; // Importujeme nový komponent
import { Player } from "@/types/playerTypes";

export default function CombatPanel({ player }: { player: Player }) {
  // Definujeme štatistiky pre Combat, Equipment a Progress
  const combatStats = [
    { label: "Fights Won", value: player.fights_won },
    { label: "Fights Lost", value: player.fights_lost },
    { label: "Missions Completed", value: player.missions_completed },
    { label: "Missions Failed", value: player.missions_failed },
  ];

  const equipmentStats = [
    { label: "Weapon", value: player.equipped_weapon ?? "None" },
    { label: "Armor", value: player.equipped_armor ?? "None" },
  ];

  const progressStats = [
    {
      label: "Experience",
      value: `${typeof player.experience === "object" ? player.experience.value : player.experience} / ${player.next_level_exp}`,
    },
    {
      label: "Credits",
      value: `${typeof player.credits === "object" ? player.credits.value : player.credits} 💰`,
    },
  ];

  return (
    <div className="flex-1 bg-gray-900 p-6 rounded-lg sci-fi-border min-w-[320px]">
      {/* Používame spoločnú komponentu pre každú sekciu */}
      <StatSection title="Combat & Missions" stats={combatStats} />
      <StatSection title="Equipment" stats={equipmentStats} />
      <StatSection title="Progress & Economy" stats={progressStats} />
    </div>
  );
}
