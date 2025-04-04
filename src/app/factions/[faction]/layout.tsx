"use client";

import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar"; // Import Sidebar
import { mockFactions } from "@/data/mockFactions"; // Mocked data pre frakcie

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const selectedFaction = decodeURIComponent(params.faction || ""); // Získanie názvu vybranej frakcie

  // Vytvorenie dynamických odkazov pre frakcie
  const factionLinks = mockFactions.map((f) => ({
    href: `/factions/${encodeURIComponent(f.name)}`,
    icon: "🏛", // Možno pridať ikony pre rôzne frakcie
    label: f.name,
  }));

  // Podmienka na zobrazenie Back tlačidla
  const showBackButton = selectedFaction !== ""; // Ak máme vybranú frakciu, zobrazí sa Back tlačidlo

  return (
    <div className="w-full min-h-screen flex bg-black text-white">
      {/* 🏛 Sidebar */}
      <Sidebar 
        links={factionLinks} // Odkazy na frakcie
        showBackButton={showBackButton}  // Dynamické zobrazenie Back tlačidla
        backButtonText="← Back to Factions Hub"  // Text tlačidla
        onBackClick={() => router.push("/factions")}  // Funkcia na návrat na hlavný hub
      />

      {/* 🌌 Hlavný obsah */}
      <main className="flex-1 w-full p-8 glassmorphism sci-fi-border">
        {children}  {/* Hlavný obsah stránky */}
      </main>
    </div>
  );
}
