"use client";

import Sidebar from "@/components/layout/Sidebar";

type Props = {
  children: React.ReactNode;
  header: string;
  sidebarLinks?: { href: string; icon: string; label: string }[];
};

export default function BaseLayout({ children, header, sidebarLinks }: Props) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col w-full relative overflow-hidden">
      {/* 🌌 Background with stars */}
      <div className="fixed inset-0 bg-stars animate-fadeIn z-0" />

      {/* 💠 Neon light blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-500 opacity-30 blur-[80px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500 opacity-30 blur-[80px]"></div>
      </div>

      {/* 🏛 Page title */}
      <header className="text-center py-6 text-3xl font-bold neon-glow z-10">{header}</header>

      {/* 📦 Layout */}
      <div className="flex flex-grow relative z-10">
        {sidebarLinks && <Sidebar links={sidebarLinks} />}
        <main className="flex-1 p-10 min-w-0 overflow-y-auto">
          <div className="glassmorphism p-6 rounded-xl w-full sci-fi-border">{children}</div>
        </main>
      </div>
    </div>
  );
}
