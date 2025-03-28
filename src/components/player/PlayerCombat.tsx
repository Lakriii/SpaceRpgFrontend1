import Stat from "./Stat";
import { Player } from "@/types/playerTypes";

export default function PlayerCombat({ player }: { player: Player }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-blue-300">Combat & Missions</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Stat label="Fights Won" value={player.fights_won} />
        <Stat label="Fights Lost" value={player.fights_lost} />
        <Stat label="Missions Completed" value={player.missions_completed} />
        <Stat label="Missions Failed" value={player.missions_failed} />
      </div>
    </div>
  );
}