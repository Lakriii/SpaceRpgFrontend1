import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Zap, Star } from 'lucide-react';

type RawResource = {
  nodeId: number;
  nodeName: string;
  rarity: string; // common, uncommon, rare, epic ...
  quantity: number;
  lastMinedAt: string | null;
};

type Resource = {
  miningNodeName: string;
  quantity: number;
  type: 'common' | 'rare' | 'legendary';
};

interface ResourceDisplayProps {
  resources: RawResource[];
}

// Mapa rarít z DB na UI typy (common, rare, legendary)
const rarityMap: Record<string, Resource['type']> = {
  common: 'common',
  uncommon: 'rare',
  rare: 'rare',
  epic: 'legendary',
};

const getResourceIcon = (type: Resource['type']) => {
  switch (type) {
    case 'legendary':
      return <Star className="w-5 h-5 text-purple-400" />;
    case 'rare':
      return <Gem className="w-5 h-5 text-blue-400" />;
    default:
      return <Zap className="w-5 h-5 text-gray-400" />;
  }
};

const getResourceColor = (type: Resource['type']) => {
  switch (type) {
    case 'legendary':
      return 'from-purple-600 to-pink-600 border-purple-400/30';
    case 'rare':
      return 'from-blue-600 to-cyan-600 border-blue-400/30';
    default:
      return 'from-gray-600 to-gray-700 border-gray-400/30';
  }
};

export default function ResourceDisplay({ resources }: ResourceDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Gem className="w-6 h-6 text-cyan-400" />
        Resource Inventory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((resource, index) => {
          const type = rarityMap[resource.rarity.toLowerCase()] || 'common';

          return (
            <motion.div
              key={`${resource.nodeName}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                bg-gradient-to-br ${getResourceColor(type)}
                border rounded-xl p-4 backdrop-blur-sm
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getResourceIcon(type)}
                  <div>
                    <h3 className="font-semibold text-white">{resource.nodeName}</h3>
                    <p className="text-xs text-gray-300 capitalize">{resource.rarity} Resource</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{resource.quantity.toLocaleString()}</p>
                  <p className="text-xs text-gray-300">Units</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
