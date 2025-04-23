'use client';

import React from 'react';

interface NodeProps {
  name: string;
  timeRequired: string;
  effect: string;
  status: string;
}

const Node: React.FC<NodeProps> = ({ name, timeRequired, effect, status }) => {
  return (
    <div
      className={`p-4 m-[10px] rounded-xl shadow-lg border-l-4 ${
        status === 'completed'
          ? 'border-green-400 bg-green-900/20'
          : status === 'in_progress'
          ? 'border-yellow-400 bg-yellow-900/20'
          : 'border-gray-400 bg-gray-800/30'
      }`}
    >
      <h3 className="text-white text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">🕒 {timeRequired}</p>
      <p className="text-xs text-gray-500">Status: {status}</p>
    </div>
  );
};

export default Node;
