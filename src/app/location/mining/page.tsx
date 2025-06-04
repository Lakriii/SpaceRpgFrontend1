'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad, Zap, Settings, Users, Target } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PreLaunchMinigame from '@/components/mining/PreLaunchMinigame';
import MissionControl from '@/components/mining/MissionControl';
import ResourceDisplay from '@/components/mining/ResourceDisplay';
import ZoneCard from '@/components/mining/ZoneCard';
import MissionLog from '@/components/mining/MissionLog';
import { useMining, miningZones } from '@/hooks/useMining';

export default function MiningPage() {
  const { user } = useAuth();
  const playerId = user?.id;

  const {
    missions,
    activeMission,
    remainingTime,
    isMinigameActive,
    credits,
    experience,
    resources,
    initiateMission,
    handleMinigameSuccess
  } = useMining(playerId);

  if (!playerId) {
    return <div className="text-white text-center mt-20">🔐 Prihláste sa, aby ste mohli ťažiť suroviny.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MINING OPERATIONS
            </h1>
            <Gamepad className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Credits: {credits.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              <span>XP: {experience.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Commander Rank</span>
            </div>
          </div>
        </motion.div>

        <ResourceDisplay resources={resources} />

        {activeMission && remainingTime && (
          <MissionControl 
            mission={activeMission} 
            remainingTime={remainingTime} 
          />
        )}

        <AnimatePresence>
          {isMinigameActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <PreLaunchMinigame onSuccess={handleMinigameSuccess} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {miningZones.map((zone, index) => (
            <ZoneCard
              key={zone.name}
              zone={zone}
              index={index}
              onLaunch={() => initiateMission(zone)}
              disabled={!!activeMission || isMinigameActive}
            />
          ))}
        </motion.div>

        <MissionLog missions={missions} />
      </div>
    </div>
  );
}
