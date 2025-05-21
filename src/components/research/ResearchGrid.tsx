'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import Node from './Node';
import { ResearchNode } from '@/types/research';

type ResearchGridProps = {
  researchData: ResearchNode[];
  onSelect: (item: any) => void;
  showNotification: (msg: string) => void;
};

const gridSize = 9 * 9;

export default function ResearchGrid({ researchData, onSelect, showNotification }: ResearchGridProps) {
  // Vytvoríme pole pre grid položky (main + sub research)
  const createGrid = () => {
    const gridItems: {
      x: number;
      y: number;
      name: string;
      effect: string;
      status: string;
      timeRequired: string;
      sub: 'yes' | 'no';
    }[] = [];

    researchData.forEach((research) => {
      const { x, y, name, description } = research;
      gridItems.push({
        x,
        y,
        name,
        effect: description,
        status: 'unlocked', // predpokladáme, že hlavné sú unlocked
        timeRequired: '',
        sub: 'no',
      });

      research.subResearch.forEach((sub) => {
        gridItems.push({
          x: sub.x,
          y: sub.y,
          name: sub.name,
          effect: sub.description,
          status: sub.status || 'locked',
          timeRequired: sub.timeRequired || '',
          sub: 'yes',
        });
      });
    });

    return gridItems;
  };

  const gridItems = createGrid();

  return (
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
                      onSelect(gridItem);
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
  );
}
