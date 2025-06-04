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
};

type Resource = {
  miningNodeName: string;
  quantity: number;
  type: 'common' | 'rare' | 'legendary';
};

let missionId = 0;

export const miningZones = [
  {
    name: '🪐 Asteroid Belt',
    description: 'Rich in common metals and crystals',
    risk: 'low' as const,
    baseReward: 100,
    color: 'from-blue-600 to-purple-700',
    icon: '🪐'
  },
  {
    name: '🌋 Volcanic Moon',
    description: 'Dangerous but rich in rare minerals',
    risk: 'medium' as const,
    baseReward: 250,
    color: 'from-orange-600 to-red-700',
    icon: '🌋'
  },
  {
    name: '🌌 Derelict Station',
    description: 'Unknown dangers, legendary rewards',
    risk: 'high' as const,
    baseReward: 500,
    color: 'from-purple-600 to-pink-700',
    icon: '🌌'
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

  const handleMinigameSuccess = () => {
    if (!pendingZone) return;

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
      reward: zone.baseReward
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

    setTimeout(() => {
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
        setCredits(prev => prev + reward);
        setExperience(prev => prev + Math.floor(reward / 2));

        fetch(`/api/player/resources?playerId=${playerId}`)
          .then(res => res.json())
          .then(data => setResources(data))
          .catch(console.error);
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
