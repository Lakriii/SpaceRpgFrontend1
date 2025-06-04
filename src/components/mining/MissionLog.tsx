import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, X, Clock, AlertTriangle } from 'lucide-react';

type Mission = {
  id: number;
  zone: string;
  duration: number;
  status: 'pending' | 'in-progress' | 'complete';
  log: string[];
  risk: 'low' | 'medium' | 'high';
  reward: number;
};

interface MissionLogProps {
  missions: Mission[];
}

export default function MissionLog({ missions }: MissionLogProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      default: return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-400/10 border-green-400/30';
      case 'in-progress': return 'bg-blue-400/10 border-blue-400/30';
      default: return 'bg-yellow-400/10 border-yellow-400/30';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-cyan-400" />
        Mission Archive
      </h2>

      {missions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-2">No missions logged</div>
          <p className="text-gray-600">Launch your first mining operation to begin</p>
        </div>
      )}

      <div className="space-y-4">
        {missions.slice().reverse().map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              border rounded-xl p-4 transition-all duration-200
              ${getStatusColor(mission.status)}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(mission.status)}
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    Mission #{mission.id}: {mission.zone}
                  </h4>
                  <p className="text-sm text-gray-400 capitalize">
                    Status: {mission.status.replace('-', ' ')}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-400">Risk Level</p>
                <p className={`font-semibold capitalize ${
                  mission.risk === 'high' ? 'text-red-400' :
                  mission.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {mission.risk}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {mission.log.map((entry, logIndex) => (
                <div key={logIndex} className="text-sm text-gray-300 font-mono bg-gray-800/30 rounded p-2">
                  {entry}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}