'use client';


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, CheckCircle, X } from 'lucide-react';

interface PreLaunchMinigameProps {
  onSuccess: () => void;
}

export default function PreLaunchMinigame({ onSuccess }: PreLaunchMinigameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [phase, setPhase] = useState<'showing' | 'input' | 'success' | 'failed'>('showing');
  const [currentIndex, setCurrentIndex] = useState(0);

  const buttons = [1, 2, 3, 4];

  useEffect(() => {
    // Generate random sequence
    const newSequence = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4) + 1);
    setSequence(newSequence);
    
    // Show sequence
    let index = 0;
    const interval = setInterval(() => {
      setCurrentIndex(index);
      index++;
      if (index >= newSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('input');
          setCurrentIndex(-1);
        }, 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (button: number) => {
    if (phase !== 'input') return;

    const newInput = [...userInput, button];
    setUserInput(newInput);

    if (button !== sequence[newInput.length - 1]) {
      setPhase('failed');
      return;
    }

    if (newInput.length === sequence.length) {
      setPhase('success');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }
  };

  const getButtonColor = (button: number) => {
    if (phase === 'showing' && sequence[currentIndex] === button) {
      return 'bg-cyan-400 shadow-cyan-400/50 shadow-2xl';
    }
    
    const colors = {
      1: 'bg-red-600 hover:bg-red-500',
      2: 'bg-green-600 hover:bg-green-500', 
      3: 'bg-blue-600 hover:bg-blue-500',
      4: 'bg-yellow-600 hover:bg-yellow-500'
    };
    
    return colors[button as keyof typeof colors];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900/95 border border-cyan-400/30 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-lg"
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Target className="w-8 h-8 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">LAUNCH SEQUENCE</h2>
          <Target className="w-8 h-8 text-cyan-400" />
        </div>
        
        {phase === 'showing' && (
          <div className="text-cyan-400 font-mono">
            <Zap className="w-6 h-6 mx-auto mb-2 animate-pulse" />
            MEMORIZE SEQUENCE
          </div>
        )}
        
        {phase === 'input' && (
          <div className="text-green-400 font-mono">
            INPUT SEQUENCE ({userInput.length}/{sequence.length})
          </div>
        )}
        
        {phase === 'success' && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-400 font-mono flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-6 h-6" />
            LAUNCH AUTHORIZED
          </motion.div>
        )}
        
        {phase === 'failed' && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-red-400 font-mono flex items-center justify-center gap-2"
          >
            <X className="w-6 h-6" />
            SEQUENCE FAILED
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {buttons.map((button) => (
          <motion.button
            key={button}
            whileHover={{ scale: phase === 'input' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-20 h-20 rounded-xl font-bold text-white text-xl
              transition-all duration-200 border-2 border-white/20
              ${getButtonColor(button)}
              ${phase !== 'input' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
            `}
            onClick={() => handleButtonClick(button)}
            disabled={phase !== 'input'}
          >
            {button}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {sequence.map((_, index) => (
          <div
            key={index}
            className={`
              w-3 h-3 rounded-full transition-colors duration-300
              ${index < userInput.length 
                ? userInput[index] === sequence[index] 
                  ? 'bg-green-400' 
                  : 'bg-red-400'
                : 'bg-gray-600'
              }
            `}
          />
        ))}
      </div>
    </motion.div>
  );
}
