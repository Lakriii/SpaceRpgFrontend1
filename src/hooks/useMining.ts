'use client';

import { useState, useEffect } from 'react';

type Mission = {
  id: number;
  zone: string;
  duration: number;
  status: 'pending' | 'in-progress' | 'complete';
  log: string[];
  risk: 'low' | 'medium' | 'high';
  reward: number;
  nodeId?: number;  // pridávam nodeId pre zaslanie na API
  yieldAmount?: number; // koľko suroviny získal hráč
};

type Resource = {
  miningNodeName: string;
  quantity: number;
  type: 'common' | 'rare' | 'legendary';
};

let missionId = 0;

export const miningZones = [
  {
    id: 1,
    name: '🪐 Asteroid Belt',
    description: 'Rich in common metals and crystals',
    risk: 'low' as const,
    baseReward: 100,
    color: 'from-blue-600 to-purple-700',
    icon: '🪐',
    yieldAmount: 10
  },
  {
    id: 2,
    name: '🌋 Volcanic Moon',
    description: 'Dangerous but rich in rare minerals',
    risk: 'medium' as const,
    baseReward: 250,
    color: 'from-orange-600 to-red-700',
    icon: '🌋',
    yieldAmount: 25
  },
  {
    id: 3,
    name: '🌌 Derelict Station',
    description: 'Unknown dangers, legendary rewards',
    risk: 'high' as const,
    baseReward: 500,
    color: 'from-purple-600 to-pink-700',
    icon: '🌌',
    yieldAmount: 50
  }
];

export function useMining(playerId: string | undefined) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [isMinigameActive, setIsMinigameActive] = useState(false);
  const [pendingZone, setPendingZone] = useState<any>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [credits, setCredits] = useState(0);
  const [experience, setExperience] = useState(0);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (!playerId) return;

    async function fetchPlayerData() {
      const res = await fetch(`/api/player/status?playerId=${playerId}`);
      const data = await res.json();
      setCredits(data.credits);
      setExperience(data.experience);
    }

    async function fetchResources() {
      const res = await fetch(`/api/player/resources?playerId=${playerId}`);
      const data = await res.json();
      setResources(data);
    }

    fetchPlayerData();
    fetchResources();
  }, [playerId]);

  const initiateMission = (zone: any) => {
    setIsMinigameActive(true);
    setPendingZone(zone);
  };

  const handleMinigameSuccess = async () => {
    if (!pendingZone || !playerId) return;

    const zone = pendingZone;
    const id = ++missionId;
    const duration = Math.floor(Math.random() * 20) + 10;
    const log = [`🛰 Launching mining operation to ${zone.name}`];
    const newMission: Mission = {
      id,
      zone: zone.name,
      duration,
      status: 'in-progress',
      log,
      risk: zone.risk,
      reward: zone.baseReward,
      nodeId: zone.id,
      yieldAmount: zone.yieldAmount
    };

    setMissions((prev) => [...prev, newMission]);
    setActiveMission(newMission);
    setIsMinigameActive(false);
    setPendingZone(null);
    setRemainingTime(duration);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(async () => {
      const success = Math.random() > (zone.risk === 'high' ? 0.4 : zone.risk === 'medium' ? 0.2 : 0.1);
      const reward = success ? zone.baseReward + Math.floor(Math.random() * 100) : 0;

      const result = success
        ? `✅ Mission successful! Extracted valuable materials. +${reward} credits`
        : `❌ Mission failed. Equipment damaged or lost.`;

      const updatedMission = {
        ...newMission,
        status: 'complete' as const,
        log: [...log, result],
      };

      setMissions((prev) => prev.map((m) => (m.id === id ? updatedMission : m)));
      setActiveMission(null);
      setRemainingTime(null);

      if (success) {
        // Pošleme výsledky na API, aby sa uložili do profilu
        const miningResults = [
          {
            miningNodeId: zone.id,
            quantity: zone.yieldAmount
          }
        ];

        try {
          const res = await fetch('/api/mining/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              playerId,
              credits: reward,
              experience: Math.floor(reward / 2),
              miningResults
            })
          });

          if (!res.ok) {
            throw new Error('Failed to save mining results');
          }

          // Aktualizuj lokálny stav z API, aby mal aktuálne resources, credits, xp
          const updatedPlayerRes = await fetch(`/api/player/resources?playerId=${playerId}`).then(r => r.json());
          setResources(updatedPlayerRes);

          const updatedPlayerStatus = await fetch(`/api/player/status?playerId=${playerId}`).then(r => r.json());
          setCredits(updatedPlayerStatus.credits);
          setExperience(updatedPlayerStatus.experience);
        } catch (err) {
          console.error('Error saving mining results:', err);
        }
      }
    }, duration * 1000);
  };

  return {
    missions,
    activeMission,
    remainingTime,
    isMinigameActive,
    credits,
    experience,
    resources,
    initiateMission,
    handleMinigameSuccess
  };
}
