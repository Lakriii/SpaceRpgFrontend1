"use client";

export default function ResearchPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">🔬 Research Center</h1>
      <p className="text-gray-400 text-center mt-2">Upgrade your technology and discover new advancements.</p>

      <div className="mt-6 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-orange-400">📡 Science Projects</h3>
        <p className="text-gray-300">Invest resources in new technologies.</p>
      </div>

      <div className="mt-4 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-400">⚡ Energy Research</h3>
        <p className="text-gray-300">Enhance ship power systems and weapons.</p>
      </div>
    </div>
  );
}