'use client';

import React, { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import Node from '@/components/research/Node';

type SubResearch = {
  id: number;
  parent_id: number;
  name: string;
  level: number;
  description: string;
  x: number;
  y: number;
  status?: string;        // môžeš rozšíriť podľa potreby
  timeRequired?: string;  // idem rovno defaultovať, ak nemáš v DB
};

type ResearchNode = {
  id: number;
  parent_id: number | null;
  name: string;
  level: number;
  description: string;
  x: number;
  y: number;
  subResearch: SubResearch[];
};

const BasicResearchGrid = () => {
  const [researchData, setResearchData] = useState<ResearchNode[]>([]);
  const [selectedResearch, setSelectedResearch] = useState<SubResearch | ResearchNode | null>(null);
  const [notification, setNotification] = useState('');
  const gridSize = 9 * 9;

  useEffect(() => {
    async function fetchResearch() {
      try {
        const res = await fetch('/api/research');
        const data: ResearchNode[] = await res.json();
        setResearchData(data);
      } catch (error) {
        console.error('Failed to fetch research data:', error);
      }
    }
    fetchResearch();
  }, []);

  const showNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 3000);
  };

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
        status: 'unlocked', // predpokladám, že hlavné sú unlocked, môžeš upraviť
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
  <div className="p-8 mx-auto text-white overflow-auto relative">
    <h1 className="text-4xl font-extrabold neon-glow text-center mb-6">
      🧠 Základný Výskum - Neural Sync
    </h1>

    {notification && (
      <div className="fixed top-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg z-50 transition-all duration-300">
        {notification}
      </div>
    )}

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

    {/* Debug: výpis načítaných dát */}
    <pre className="mt-8 p-4 bg-gray-800 text-sm text-white overflow-auto max-h-60 rounded">
      {JSON.stringify(researchData, null, 2)}
    </pre>

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
