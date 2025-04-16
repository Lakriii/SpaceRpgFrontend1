'use client';

import React from 'react';

interface Props {
  remaining: number;
}

const DroneStatus: React.FC<Props> = ({ remaining }) => {
  return (
    <div className="mt-3 text-sm text-cyan-400">
      🤖 Drone operating... Time left: {remaining}s
    </div>
  );
};

export default DroneStatus;
