// src/components/Combat.tsx

import React, { useState } from "react";

type Props = {
  npcName: string;
};

const Combat: React.FC<Props> = ({ npcName }) => {
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [playerHealth, setPlayerHealth] = useState<number>(100);
  const [npcHealth, setNpcHealth] = useState<number>(100);

  const attack = () => {
    const playerDamage = Math.floor(Math.random() * 20);
    const npcDamage = Math.floor(Math.random() * 15);

    setNpcHealth(npcHealth - playerDamage);
    setPlayerHealth(playerHealth - npcDamage);

    setCombatLog((prevLog) => [
      ...prevLog,
      `You dealt ${playerDamage} damage.`,
      `${npcName} dealt ${npcDamage} damage.`,
    ]);
  };

  const isCombatOver = playerHealth <= 0 || npcHealth <= 0;

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-400 mb-2">Boj s {npcName}</h3>
      <p className="text-gray-300">Player Health: {playerHealth}</p>
      <p className="text-gray-300">{npcName} Health: {npcHealth}</p>

      <button
        className="mt-2 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        onClick={attack}
        disabled={isCombatOver}
      >
        Attack
      </button>

      <div className="mt-4">
        <h4 className="text-white">Combat Log:</h4>
        {combatLog.map((log, index) => (
          <p key={index} className="text-gray-400">
            {log}
          </p>
        ))}
      </div>

      {isCombatOver && (
        <div className="mt-4 text-lg font-bold text-green-500">
          {playerHealth <= 0 ? "You lost the battle!" : `You defeated ${npcName}!`}
        </div>
      )}
    </div>
  );
};

export default Combat;
