'use client';

import React, { useState, useEffect } from 'react';
import ResearchGrid from '@/components/research/ResearchGrid';
import ResearchPanel from '@/components/research/ResearchPanel';
import Notification from '@/components/research/Notification';
import { ResearchNode, SubResearch } from '@/types/research';

export default function HomePage() {
  const [researchData, setResearchData] = useState<ResearchNode[]>([]);
  const [selectedResearch, setSelectedResearch] = useState<SubResearch | ResearchNode | null>(null);
  const [notification, setNotification] = useState('');

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

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleStartResearch = async (research: any) => {
    showNotification('🧪 Výskum spustený!');
    setSelectedResearch(null);

    // Simuluj čas výskumu 5 sekúnd
    setTimeout(async () => {
      showNotification('✅ Výskum dokončený!');

      // Zavolaj API na uloženie stavu dokončeného výskumu
      try {
        const response = await fetch('/api/research/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: research.id }),
        });
        if (response.ok) {
          // Aktualizuj lokálny stav, aby sa odomkol ďalší výskum
          // Tu treba aktualizovať researchData s novými stavmi zo servera
          const updatedData = await response.json();
          setResearchData(updatedData);
        } else {
          showNotification('❌ Chyba pri ukladaní výskumu.');
        }
      } catch (error) {
        showNotification('❌ Chyba pri ukladaní výskumu.');
        console.error(error);
      }
    }, 5000);
  };

  return (
    <div className="p-8 mx-auto text-white overflow-auto relative min-h-screen bg-black">
      <h1 className="text-4xl font-extrabold neon-glow text-center mb-6">
        🧠 Základný Výskum - Neural Sync
      </h1>

      <ResearchGrid
        researchData={researchData}
        onSelect={setSelectedResearch}
        showNotification={showNotification}
      />

      <ResearchPanel
        selectedResearch={selectedResearch}
        onClose={() => setSelectedResearch(null)}
        onStartResearch={handleStartResearch}
      />

      <Notification message={notification} />
    </div>
  );
}
