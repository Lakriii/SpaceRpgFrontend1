'use client';  // Toto je dôležité pre klientsku logiku

import React from 'react';
import Link from 'next/link';  // Importujeme Link z next/link

// Kategórie výskumu
const researchCategories = [
  {
    title: "🧬 DNA Synth",
    description: "Poskladaj genetickú sekvenciu a zlepši výskum.",
    path: "research/games/dna-synth",
  },
  {
    title: "⚙️ Core Calibration",
    description: "Vyváž energetické systémy a urob výskum efektívnym.",
    path: "research/games/core-calibration",
  },
  {
    title: "💡 Neural Sync",
    description: "Prepoji neurónové siete pre efektívnejší výskum.",
    path: "research/games/neural-sync",
  },
  {
    title: "🔬 Quantum Research",
    description: "Preskúmaj kvantové funkcie a objav nové technológie.",
    path: "research/games/quantum",
  },
  {
    title: "⚡ Energy Research",
    description: "Zvýš výkon vašich zariadení a optimalizuj energetické procesy.",
    path: "research/games/energy",
  },
];

const ResearchPage: React.FC = () => {
  return (
    <div className="research-page p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">🔬 Research Center</h1>
      <p className="text-gray-400 text-center mt-2">Vyberte si výskumnú oblasť a začnite zlepšovať technológie!</p>

      <div className="research-categories mt-6">
        {researchCategories.map((category) => (
          <Link key={category.title} href={category.path}>
            <div className="research-category mt-4 glassmorphism p-4 rounded-lg cursor-pointer">
              <h3 className="text-lg font-semibold text-orange-400">{category.title}</h3>
              <p className="text-gray-300">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResearchPage;
