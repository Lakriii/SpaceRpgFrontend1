'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  onSuccess: () => void;
}

const options = ['A', 'B', 'C'];

const PreLaunchMinigame: React.FC<Props> = ({ onSuccess }) => {
  const [target, setTarget] = useState<string>('');
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [intervalDelay, setIntervalDelay] = useState<NodeJS.Timeout | null>(null);

  const maxScore = 5;
  const maxMistakes = 3;

  const generateNewTarget = () => {
    const random = options[Math.floor(Math.random() * options.length)];
    setTarget(random);
  };

  useEffect(() => {
    generateNewTarget();
    const interval = setInterval(generateNewTarget, 1000);
    setIntervalDelay(interval);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (option: string) => {
    if (intervalDelay) clearInterval(intervalDelay);

    if (option === target) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= maxScore) {
        onSuccess();
        return;
      }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= maxMistakes) {
        alert("❌ Too many mistakes. Mission aborted.");
        return;
      }
    }

    generateNewTarget();
    const interval = setInterval(generateNewTarget, 1000);
    setIntervalDelay(interval);
  };

  return (
    <div className="mt-4 p-4 bg-gray-900 border border-yellow-600 rounded">
      <h3 className="text-yellow-300 font-semibold mb-2">🎯 Pre-Launch Targeting</h3>
      <p className="text-sm text-gray-300 mb-2">
        Click on the highlighted target before time runs out. Score: {score}/{maxScore}, Mistakes: {mistakes}/{maxMistakes}
      </p>
      <div className="flex gap-4 justify-center mt-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            className={`px-4 py-2 rounded text-white font-bold ${
              opt === target ? 'bg-green-600 animate-pulse' : 'bg-gray-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreLaunchMinigame;
