'use client';

import React, { useState, useEffect, useRef } from 'react';

const generateSequence = (length: number): string => {
  const bases = ['A', 'T', 'G', 'C'];
  return Array.from({ length }, () => bases[Math.floor(Math.random() * bases.length)]).join('');
};

const DnaSynth: React.FC = () => {
  const [level, setLevel] = useState(1);
  const initialLength = 4;

  const targetSequenceRef = useRef<string>(generateSequence(initialLength));
  const [currentSequence, setCurrentSequence] = useState<string[]>(Array(targetSequenceRef.current.length).fill(''));
  const [feedback, setFeedback] = useState<string[]>(Array(targetSequenceRef.current.length).fill(''));
  const [errorCount, setErrorCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameOver) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => parseFloat((prev + 0.1).toFixed(2)));
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameOver]);

  const handleAddBase = (index: number, base: string) => {
    if (gameOver || currentSequence[index] !== '') return;

    const newSequence = [...currentSequence];
    newSequence[index] = base;

    const newFeedback = [...feedback];
    if (base === targetSequenceRef.current[index]) {
      newFeedback[index] = 'correct';
    } else {
      newFeedback[index] = 'wrong';
    }

    setCurrentSequence(newSequence);
    setFeedback(newFeedback);

    const isComplete = newSequence.every(b => b !== '');
    if (isComplete) {
      const isCorrect = newSequence.join('') === targetSequenceRef.current;
      if (isCorrect) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => nextLevel(), 800);
      } else {
        setErrorCount(errorCount + 1);
        setGameOver(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    const nextLength = targetSequenceRef.current.length + 1;
    targetSequenceRef.current = generateSequence(nextLength);
    setCurrentSequence(Array(nextLength).fill(''));
    setFeedback(Array(nextLength).fill(''));
    setTimeElapsed(0);
    setGameOver(false);
  };

  const resetGame = () => {
    setLevel(1);
    setCurrentSequence(Array(targetSequenceRef.current.length).fill(''));
    setFeedback(Array(targetSequenceRef.current.length).fill(''));
    setErrorCount(0);
    setTimeElapsed(0);
    setGameOver(false);
  };

  return (
    <div className="dna-synth-container p-6 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold text-center mb-4">🧬 DNA Synth - Level {level}</h2>

      <div className="flex justify-center gap-2 mb-4">
        {currentSequence.map((base, index) => (
          <span
            key={index}
            className={`w-10 h-10 border rounded grid place-items-center text-lg font-mono ${
              feedback[index] === 'correct'
                ? 'bg-green-700'
                : feedback[index] === 'wrong'
                ? 'bg-red-700'
                : 'bg-gray-800'
            }`}
          >
            {base || '_'}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {['A', 'T', 'G', 'C'].map(base => (
          <button
            key={base}
            className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-4 rounded font-bold"
            onClick={() => {
              const nextEmptyIndex = currentSequence.findIndex(b => b === '');
              if (nextEmptyIndex !== -1) {
                handleAddBase(nextEmptyIndex, base);
              }
            }}
            disabled={gameOver}
          >
            {base}
          </button>
        ))}
      </div>

      {gameOver && (
        <p className="text-red-400 text-center text-xl font-semibold">💀 Zlá sekvencia! Koniec hry.</p>
      )}

      {!gameOver && currentSequence.join('') === targetSequenceRef.current && (
        <p className="text-green-400 text-center text-lg font-semibold">✅ Správne! Pokračuješ...</p>
      )}

      <div className="mt-4 text-center text-sm text-gray-300">
        <p>⏱️ Čas: <span className="text-cyan-400">{timeElapsed.toFixed(2)}s</span></p>
        <p>❌ Chyby: <span className="text-red-400">{errorCount}</span></p>
      </div>

      <div className="text-center mt-4">
        <button
          className="mt-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 rounded"
          onClick={resetGame}
        >
          🔄 Reštartovať hru
        </button>
      </div>
    </div>
  );
};

export default DnaSynth;
