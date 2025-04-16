'use client';

import React, { useState } from 'react';
import { MiningGameState, Neuron, NeuronType } from '@/types/reaserchTypes';

const NeuralDrillPuzzle: React.FC = () => {
  const initialState: MiningGameState = {
    energy: 100,
    minerals: 0,
    turnsRemaining: 10,
    neurons: [
      { id: "1", type: "Amplify", isActive: false, energyCost: 10, effect: "Increases mineral output" },
      { id: "2", type: "Invert", isActive: false, energyCost: 5, effect: "Reverses signal flow" },
      { id: "3", type: "Delay", isActive: false, energyCost: 8, effect: "Delays the signal" },
    ]
  };

  const [gameState, setGameState] = useState<MiningGameState>(initialState);

  const activateNeuron = (id: string) => {
    setGameState(prevState => {
      const updatedNeurons = prevState.neurons.map(neuron =>
        neuron.id === id ? { ...neuron, isActive: true } : neuron
      );
      return { ...prevState, neurons: updatedNeurons };
    });
  };

  return (
    <div>
      <h2>Neural Drill Puzzle</h2>
      <p>Energy: {gameState.energy} | Minerals: {gameState.minerals}</p>
      <p>Turns Remaining: {gameState.turnsRemaining}</p>

      <div>
        {gameState.neurons.map(neuron => (
          <div key={neuron.id}>
            <h4>{neuron.type}</h4>
            <p>{neuron.effect}</p>
            <button onClick={() => activateNeuron(neuron.id)}>
              Activate {neuron.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeuralDrillPuzzle;
