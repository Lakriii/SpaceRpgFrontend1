import Stat from "./Stat";
import { Player } from "@/types/playerTypes";

export default function PlayerProgress({ player }: { player: Player }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-blue-300">Progress & Economy</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Stat label="Experience" value={`${player.experience} / ${player.next_level_exp}`} />
        <Stat label="Credits" value={`${player.credits} 💰`} />
      </div>
    </div>
  );
}