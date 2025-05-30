'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import Node from './Node';
import { ResearchNode } from '@/types/research';

type GridItem = {
  id: number;
  x: number;
  y: number;
  name: string;
  effect: string;
  status: string;
  timeRequired: string;
};

type ResearchGridProps = {
  researchData: ResearchNode[];
  onSelect: (item: GridItem) => void;
  showNotification: (msg: string) => void;
};

const gridSize = 81;

export default function ResearchGrid({ researchData, onSelect, showNotification }: ResearchGridProps) {
  const gridItems: GridItem[] = researchData.flatMap(({ id, x, y, name, description, status, subResearch }) => [
  { id, x, y, name, effect: description, status: status || 'locked', timeRequired: '' },
  ...subResearch.map(sub => ({
    id: sub.id,
    x: sub.x,
    y: sub.y,
    name: sub.name,
    effect: sub.description,
    status: sub.status || 'locked',
    timeRequired: sub.timeRequired || '',
  })),
]);

  return (
    <div className="grid" style={{
      gridTemplateColumns: 'repeat(9, 150px)',
      gridTemplateRows: 'repeat(9, 150px)',
      gap: '10px',
      justifyContent: 'center',
      alignContent: 'center',
      width: 'fit-content',
      margin: '0 auto',
      background: 'transparent',
    }}>
      {Array.from({ length: gridSize }, (_, index) => {
        const x = index % 9, y = Math.floor(index / 9);
        const gridItem = gridItems.find(item => item.x === x && item.y === y);

        const handleClick = () => {
          if (!gridItem) return;
          if (gridItem.status === 'unlocked') onSelect(gridItem);
          else showNotification(gridItem.status === 'completed' ? '✅ Výskum už bol dokončený.' : '🔒 Tento výskum ešte nie je odomknutý.');
        };

        return (
          <Tooltip.Provider key={index}>
            <Tooltip.Root delayDuration={100}>
              <Tooltip.Trigger asChild>
                <div className="w-[150px] h-[150px] flex items-center justify-center cursor-pointer" onClick={handleClick}>
                  {gridItem ? <Node {...gridItem} /> : <div className="w-0 h-0 invisible" />}
                </div>
              </Tooltip.Trigger>

              {gridItem && (
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-xl max-w-[200px] text-center z-50" side="top" sideOffset={5}>
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