'use client';

import React, { useState } from 'react';
import { techTreeNeuralSync } from '@/data/mockMokData';
import * as Tooltip from '@radix-ui/react-tooltip';
import Node from '@/components/research/Node';

const BasicResearchGrid = () => {
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [notification, setNotification] = useState('');
  const gridSize = 9 * 9;

  const showNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 3000);
  };

  const createGrid = () => {
    const gridItems = [];

    techTreeNeuralSync.forEach((research) => {
      const { x, y } = research.position;
      gridItems.push({
        x,
        y,
        name: research.name,
        effect: research.description,
        status: 'unlocked',
        timeRequired: '',
        sub: 'no',
      });
    });

    techTreeNeuralSync.forEach((level) => {
      level.subResearch.forEach((research) => {
        const { x, y } = research.position;
        gridItems.push({
          x,
          y,
          name: research.name,
          effect: research.effect,
          status: research.status,
          timeRequired: research.timeRequired,
          sub: 'yes',
        });
      });
    });

    return gridItems;
  };

  const gridItems = createGrid();

  return (
    <div className="p-8 mx-auto text-white overflow-auto relative">
      <h1 className="text-4xl font-extrabold neon-glow text-center mb-6">
        🧠 Základný Výskum - Neural Sync
      </h1>

      {/* 🟡 Toast notifikácia */}
      {notification && (
        <div className="fixed top-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg z-50 transition-all duration-300">
          {notification}
        </div>
      )}

      {/* 🔲 Grid výskumu */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(9, 150px)',
          gridTemplateRows: 'repeat(9, 150px)',
          gap: '10px',
          justifyContent: 'center',
          alignContent: 'center',
          width: 'fit-content',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        {Array.from({ length: gridSize }, (_, index) => {
          const gridItem = gridItems.find(
            (item) => item.x === index % 9 && item.y === Math.floor(index / 9)
          );

          return (
            <Tooltip.Provider key={index}>
              <Tooltip.Root delayDuration={100}>
                <Tooltip.Trigger asChild>
                  <div
                    className="w-[150px] h-[150px] flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      if (!gridItem) return;
                      if (gridItem.status === 'unlocked') {
                        setSelectedResearch(gridItem);
                      } else {
                        showNotification(
                          gridItem.status === 'completed'
                            ? '✅ Výskum už bol dokončený.'
                            : '🔒 Tento výskum ešte nie je odomknutý.'
                        );
                      }
                    }}
                  >
                    {gridItem ? (
                      <Node
                        name={gridItem.name}
                        effect={gridItem.effect}
                        status={gridItem.status}
                        timeRequired={gridItem.timeRequired}
                      />
                    ) : (
                      <div className="w-[0px] h-[0px] invisible" />
                    )}
                  </div>
                </Tooltip.Trigger>

                {gridItem && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-xl max-w-[200px] text-center z-50"
                      side="top"
                      sideOffset={5}
                    >
                      {gridItem.effect}
                      <Tooltip.Arrow className="fill-gray-900" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>
          );
        })}
      </div>

      {/* 📦 Bočný panel s detailmi výskumu */}
      {selectedResearch && (
        <div className="fixed top-0 right-0 w-[400px] h-full bg-gray-900 text-white p-6 shadow-2xl z-50 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">{selectedResearch.name}</h2>
          <p className="mb-4">{selectedResearch.effect}</p>
          <p className="mb-4 text-sm text-gray-400">
            Čas potrebný na výskum: {selectedResearch.timeRequired || 'Nešpecifikovaný'}
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-4"
            onClick={() => {
              showNotification('🧪 Výskum spustený!');
              setSelectedResearch(null);
            }}
          >
            Spustiť výskum
          </button>
          <button
            className="text-sm text-gray-400 hover:text-white underline"
            onClick={() => setSelectedResearch(null)}
          >
            Zavrieť
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicResearchGrid;
