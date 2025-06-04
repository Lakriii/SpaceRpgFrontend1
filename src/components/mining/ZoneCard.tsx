import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Zap, Rocket } from 'lucide-react';

interface Zone {
  name: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
  baseReward: number;
  color: string;
  icon: string;
}

interface ZoneCardProps {
  zone: Zone;
  index: number;
  onLaunch: () => void;
  disabled: boolean;
}

export default function ZoneCard({ zone, index, onLaunch, disabled }: ZoneCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 border-red-400/30';
      case 'medium': return 'text-yellow-400 border-yellow-400/30';
      default: return 'text-green-400 border-green-400/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`
        bg-gradient-to-br ${zone.color} 
        border border-white/20 rounded-2xl p-6 
        backdrop-blur-sm relative overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 text-6xl opacity-10">
        {zone.icon}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{zone.name}</h3>
          <div className={`px-2 py-1 rounded border text-xs font-semibold ${getRiskColor(zone.risk)}`}>
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            {zone.risk.toUpperCase()}
          </div>
        </div>

        <p className="text-gray-200 text-sm mb-4">{zone.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Base Reward:</span>
            <span className="text-yellow-400 font-semibold flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {zone.baseReward} CR
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Duration:</span>
            <span className="text-blue-400 font-semibold">10-30 sec</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={onLaunch}
          disabled={disabled}
          className={`
            w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-cyan-600 to-blue-600
            hover:from-cyan-500 hover:to-blue-500
            transition-all duration-200
            flex items-center justify-center gap-2
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Rocket className="w-5 h-5" />
          LAUNCH MISSION
        </motion.button>
      </div>
    </motion.div>
  );
}