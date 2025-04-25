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
    <div className="p-8 mx-auto text-white overflow-auto">
  <h1 className="text-4xl font-extrabold neon-glow text-center mb-6">
    🧠 Základný Výskum - Neural Sync
  </h1>

  {/* Kontajner pre pevnú grid mriežku */}
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
    minWidth: 'auto',
    background: 'transparent', // toto môžeš pridať pre istotu
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
  className="w-[150px] h-[150px] flex items-center justify-center"
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
</div>
  );
};

export default BasicResearchGrid;
