// src/components/Reward.tsx

import React from "react";

type Props = {
  reward: string;
  onClaimReward: () => void;
};

const Reward: React.FC<Props> = ({ reward, onClaimReward }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-400 mb-2">Odmena</h3>
      <p className="text-gray-300">Your reward is: {reward}</p>
      <button
        className="mt-2 text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
        onClick={onClaimReward}
      >
        Claim Reward
      </button>
    </div>
  );
};

export default Reward;
