'use client';

import React from 'react';

interface Props {
  zone: string;
}

const MiningScanner: React.FC<Props> = ({ zone }) => {
  return (
    <div className="p-4 border border-yellow-600 rounded bg-gray-900 text-yellow-300 mt-4 animate-pulse">
      <p>📡 Scanning {zone} for resource veins...</p>
      <p className="text-sm text-yellow-100 mt-1">Geological anomalies detected. Proceed with caution.</p>
    </div>
  );
};

export default MiningScanner;
