"use client";

import StatSection from "./StatSection"; // Importujeme nový komponent

export default function UnifiedPlayerDetails({ player }: { player: any }) {
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
    { label: "Experience", value: `${player.experience} / ${player.next_level_exp}` },
    { label: "Credits", value: `${player.credits} 💰` },
  ];

  return (
    <div className="mt-6">
      <StatSection title="Combat & Missions" stats={combatStats} />
      <StatSection title="Equipment" stats={equipmentStats} />
      <StatSection title="Progress & Economy" stats={progressStats} />
    </div>
  );
}
