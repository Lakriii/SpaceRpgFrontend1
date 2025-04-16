'use client';

import React from 'react';

interface Props {
  success: boolean;
}

const samples = [
  '🪨 Iridium Crystals',
  '🧪 Xenon Gas',
  '🔋 Plasma Residue',
  '💎 Quantum Diamonds',
];

const ResourceAnalyzer: React.FC<Props> = ({ success }) => {
  if (!success) {
    return (
      <div className="mt-2 text-red-400">⚠️ No materials recovered. System malfunction.</div>
    );
  }

  const discovered = samples.sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="mt-2 text-green-300">
      <p>🔍 Analysis complete. Samples obtained:</p>
      <ul className="list-disc list-inside text-sm">
        {discovered.map((res, i) => (
          <li key={i}>{res}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceAnalyzer;
