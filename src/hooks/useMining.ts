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
  nodeId?: number;
  yieldAmount?: number;
};

type Resource = {
  nodeId: number;
  nodeName: string;
  rarity: 'common' | 'rare' | 'legendary';
  quantity: number;
  lastMinedAt: string | null;
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

function safeNumber(value: any): number {
  if (value == null) return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return isNaN(n) ? 0 : n;
  }
  if (typeof value === 'object') {
    if ('value' in value && typeof value.value === 'number') return value.value;
  }
  return 0;
}

export function useMining(playerId: string | undefined) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [isMinigameActive, setIsMinigameActive] = useState(false);
  const [pendingZone, setPendingZone] = useState<typeof miningZones[0] | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [credits, setCredits] = useState(0);
  const [experience, setExperience] = useState(0);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (!playerId) return;

    async function fetchPlayerData() {
      try {
        const res = await fetch(`/api/player?userId=${playerId}`);
        if (!res.ok) {
          console.error('Failed to fetch player data');
          return;
        }
        const data = await res.json();

        if (data.player) {
          setCredits(safeNumber(data.player.credits));
          setExperience(safeNumber(data.player.experience));
        }

        if (data.resources) {
          setResources(data.resources);
        }
      } catch (err) {
        console.error('Error fetching player data:', err);
      }
    }

    fetchPlayerData();
  }, [playerId]);

  const initiateMission = (zone: typeof miningZones[0]) => {
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
        try {
          const res = await fetch('/api/mining/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: playerId,  // POZOR: správny kľúč je userId
              credits: reward,
              experience: Math.floor(reward / 2),
              miningResults: [
                {
                  miningNodeId: zone.id,
                  quantity: zone.yieldAmount || 0
                }
              ]
            })
          });

          if (!res.ok) {
            throw new Error('Failed to save mining results');
          }

          const updatedData = await fetch(`/api/player?userId=${playerId}`).then(r => r.json());

          if (updatedData.player) {
            setCredits(safeNumber(updatedData.player.credits));
            setExperience(safeNumber(updatedData.player.experience));
          }
          if (updatedData.resources) {
            setResources(updatedData.resources);
          }
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
