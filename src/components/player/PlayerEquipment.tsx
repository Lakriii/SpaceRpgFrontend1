import Stat from "./Stat";
import { Player } from "@/types/playerTypes";

export default function PlayerEquipment({ player }: { player: Player }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-blue-300">Equipment</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Stat label="Weapon" value={player.equipped_weapon ?? "None"} />
        <Stat label="Armor" value={player.equipped_armor ?? "None"} />
      </div>
    </div>
  );
}