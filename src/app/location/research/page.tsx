'use client';

import React, { useState, useEffect } from 'react';
import ResearchGrid from '@/components/research/ResearchGrid';
import ResearchPanel from '@/components/research/ResearchPanel';
import Notification from '@/components/research/Notification';
import { ResearchNode, SubResearch } from '@/types/research';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [researchData, setResearchData] = useState<ResearchNode[]>([]);
  const [selectedResearch, setSelectedResearch] = useState<SubResearch | ResearchNode | null>(null);
  const [notification, setNotification] = useState('');

  // ✅ Upravené fetchResearch, teraz posielame userId
  async function fetchResearch() {
    try {
      if (!user?.id) {
        console.error("❌ Missing userId, skipping research fetch.");
        return;
      }

      const res = await fetch(`/api/research?userId=${user.id}`);
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("❌ Invalid research data received:", data);
        setResearchData([]);
        return;
      }

      setResearchData(data);
      console.log("fetchResearch:", data);
    } catch (error) {
      console.error('Failed to fetch research data:', error);
    }
  }

  // ✅ Voláme fetchResearch len ak máme userId k dispozícii
  useEffect(() => {
    if (user?.id) {
      fetchResearch();
    }
  }, [user]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleStartResearch = async (research: any) => {
    if (research.status !== 'unlocked') {
      showNotification('❌ Tento výskum nie je možné spustiť.');
      return;
    }

    console.log("Spúšťam výskum:", research);
    showNotification('🧪 Výskum spustený!');
    setSelectedResearch(null);

    setTimeout(async () => {
      showNotification('✅ Výskum dokončený!');

      try {
        const response = await fetch('/api/research/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: Number(research.id), userId: user?.id }),
        });

        if (response.ok) {
          await fetchResearch();
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