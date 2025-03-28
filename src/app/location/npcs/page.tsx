"use client";

export default function NpcsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">👤 NPC Interaction</h1>
      <p className="text-gray-400 text-center mt-2">Meet characters, accept quests, and negotiate deals.</p>

      <div className="mt-6 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-400">💬 Dialogue System</h3>
        <p className="text-gray-300">Engage in interactive conversations with NPCs.</p>
      </div>

      <div className="mt-4 glassmorphism p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-400">📜 Quests</h3>
        <p className="text-gray-300">Complete missions and earn rewards.</p>
      </div>
    </div>
  );
}