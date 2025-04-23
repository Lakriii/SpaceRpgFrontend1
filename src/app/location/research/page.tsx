'use client';

import React from 'react';
import { techTreeNeuralSync } from '@/data/mockMokData';
import * as Tooltip from '@radix-ui/react-tooltip';
import Node from '@/components/research/Node';

const BasicResearchGrid = () => {
  const gridSize = 9 * 9;

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
        sub: "no",
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
          sub: "yes",
        });
      });
    });

    return gridItems;
  };

  const gridItems = createGrid();

  return (
    <div className="p-8 max-w-6xl mx-auto text-white min-w-[800px] min-h-[600px]">
      <h1 className="text-4xl font-extrabold neon-glow text-center mb-6">🧠 Základný Výskum - Neural Sync</h1>

      {/* Kontajner pre mriežku */}
      <div className="grid grid-cols-9 gap-[10px] justify-center items-center overflow-auto max-w-[1500px] mx-auto">
        
        {Array.from({ length: gridSize }, (_, index) => {
          const gridItem = gridItems.find(item => item.x === index % 9 && item.y === Math.floor(index / 9));

          return (
            <Tooltip.Provider key={index}>
              <Tooltip.Root delayDuration={100}>
                <Tooltip.Trigger asChild>
                  <div className="w-[164px] h-[180px] flex items-center justify-center min-w-0 flex-shrink-0 overflow-hidden">
                    {gridItem ? (
                      <Node
                        name={gridItem.name}
                        effect={gridItem.effect}
                        status={gridItem.status}
                        timeRequired={gridItem.timeRequired}
                      />
                    ) : (
                      // Prázdne bunky s viditeľnou šírkou 10px
                      <div className="w-[10px] h-[96px] border-2 border-red-500 bg-black/10" />
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
    </div>
  );
};

export default BasicResearchGrid;
