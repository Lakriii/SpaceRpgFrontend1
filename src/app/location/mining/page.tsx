'use client';

import React, { useState, useEffect } from 'react';
import PreLaunchMinigame from '@/components/mining/PreLaunchMinigame';
import { useAuth } from '@/context/AuthContext';

type Mission = {
  id: number;
  zone: string;
  duration: number;
  status: 'pending' | 'in-progress' | 'complete';
  log: string[];
};

type Resource = {
  miningNodeName: string;
  quantity: number;
};

let missionId = 0;

const miningZones = ['🪐 Asteroid Belt', '🌋 Volcanic Moon', '🌌 Derelict Station'];

export default function MiningPage() {
  const { user } = useAuth();
  const playerId = user?.id;

  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [isMinigameActive, setIsMinigameActive] = useState(false);
  const [pendingZone, setPendingZone] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  if (!playerId) return <div>Prosím prihláste sa pre zobrazenie zdrojov.</div>;

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch(`/api/player/resources?playerId=${playerId}`);
        if (res.ok) {
          const data = await res.json();
          setResources(data);
        }
      } catch {
        // Chyby ignorujeme ticho
      }
    }
    fetchResources();
  }, [playerId]);

  const initiateMission = (zone: string) => {
    setIsMinigameActive(true);
    setPendingZone(zone);
  };

  const handleMinigameSuccess = () => {
    if (!pendingZone) return;

    const zone = pendingZone;
    const id = ++missionId;
    const duration = Math.floor(Math.random() * 20) + 10;
    const log = [`🛰 Launching mission to ${zone}`];
    const newMission: Mission = {
      id,
      zone,
      duration,
      status: 'in-progress',
      log,
    };

    setMissions((prev) => [...prev, newMission]);
    setActiveMission(newMission);
    setIsMinigameActive(false);
    setPendingZone(null);
    setRemainingTime(duration);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      const result = success
        ? `✅ Successfully extracted rare minerals from ${zone}`
        : `❌ Mission to ${zone} failed. Equipment lost.`;

      const updatedMission = {
        ...newMission,
        status: 'complete',
        log: [...log, result],
      };

      setMissions((prev) => prev.map((m) => (m.id === id ? updatedMission : m)));
      setActiveMission(null);
      setRemainingTime(null);
    }, duration * 1000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">⚙️ Tactical Mining</h1>

      <div className="flex justify-center gap-6 mt-4 mb-8">
        {resources.length === 0 && <div className="text-gray-500 italic">Loading resources...</div>}
        {resources.map((res) => (
          <div
            key={res.miningNodeName}
            className="bg-yellow-700 px-3 py-1 rounded text-black font-semibold"
          >
            {res.miningNodeName}: {res.quantity}
          </div>
        ))}
      </div>

      <p className="text-gray-400 text-center mt-2">
        Plan missions, send your team, and deal with the unknown.
      </p>

      {isMinigameActive && <PreLaunchMinigame onSuccess={handleMinigameSuccess} />}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {miningZones.map((zone) => (
          <div key={zone} className="glassmorphism p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-300">{zone}</h3>
            <p className="text-sm text-gray-300">Estimated mission time: 10–30s</p>
            <button
              className="mt-2 px-4 py-2 bg-yellow-700 hover:bg-yellow-800 rounded"
              onClick={() => initiateMission(zone)}
              disabled={!!activeMission || isMinigameActive}
            >
              🚀 Launch Mission
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-2">📜 Mission Log</h2>
        {missions.length === 0 && <p className="text-gray-500">No missions yet.</p>}
        {missions.map((m) => (
          <div key={m.id} className="glassmorphism p-3 rounded mb-2">
            <h4 className="text-md font-semibold text-blue-400">
              Mission #{m.id} to {m.zone}
            </h4>
            <p className="text-sm text-gray-400">Status: {m.status}</p>
            <ul className="text-sm mt-1 space-y-1 text-gray-300">
              {m.log.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
