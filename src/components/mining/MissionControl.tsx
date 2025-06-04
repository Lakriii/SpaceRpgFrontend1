import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Target, Zap } from 'lucide-react';

type Mission = {
  id: number;
  zone: string;
  duration: number;
  status: 'pending' | 'in-progress' | 'complete';
  log: string[];
  risk: 'low' | 'medium' | 'high';
  reward: number;
};

interface MissionControlProps {
  mission: Mission;
  remainingTime: number;
}

export default function MissionControl({ mission, remainingTime }: MissionControlProps) {
  const progress = ((mission.duration - remainingTime) / mission.duration) * 100;
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-green-400 bg-green-400/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-gray-900/90 to-blue-900/90 border border-cyan-400/30 rounded-2xl p-6 mb-8 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <Target className="w-6 h-6" />
            ACTIVE MISSION #{mission.id}
          </h2>
          <p className="text-gray-300">{mission.zone}</p>
        </div>
        
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(mission.risk)}`}>
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            {mission.risk.toUpperCase()} RISK
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Time Remaining</span>
          </div>
          <p className="text-2xl font-mono text-white">
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Expected Reward</span>
          </div>
          <p className="text-2xl font-mono text-white">{mission.reward.toLocaleString()} CR</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Progress</span>
          </div>
          <p className="text-2xl font-mono text-white">{Math.round(progress)}%</p>
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
        <motion.div 
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-cyan-400 animate-pulse">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <span className="font-mono">MISSION IN PROGRESS</span>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
      </div>
    </motion.div>
  );
}