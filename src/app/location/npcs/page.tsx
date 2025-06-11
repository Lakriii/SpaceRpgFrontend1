"use client";

import { useEffect, useState } from "react";
import { Npc } from "@/types/Npc";
import NpcCard from "@/components/npc/NpcCard";
import NpcModal from "@/components/npc/NpcModal";

export default function NpcsPage() {
  const [selectedNpc, setSelectedNpc] = useState<Npc | null>(null);
  const [npcList, setNpcList] = useState<Npc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNpcs = async () => {
      try {
        const res = await fetch("/api/npcs");
        const data = await res.json();
        setNpcList(data);
      } catch (error) {
        console.error("Failed to load NPCs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNpcs();
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading NPCs...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">👤 NPC Interaction</h1>
      <p className="text-gray-400 text-center mt-2">Klikni na postavu a interaguj s ňou.</p>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {npcList.map((npc) => (
          <NpcCard key={npc.id} npc={npc} onClick={setSelectedNpc} />
        ))}
      </div>

      {selectedNpc && <NpcModal npc={selectedNpc} onClose={() => setSelectedNpc(null)} />}
    </div>
  );
}
