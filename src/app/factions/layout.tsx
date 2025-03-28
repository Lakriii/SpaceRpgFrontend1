export default function FactionsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col w-full">
        {/* 🌌 Holographic Background */}
        <div className="fixed inset-0 bg-stars animate-fadeIn"></div>
  
        <header className="text-center py-6 text-3xl font-bold neon-glow">
          🏛 Galactic Factions
        </header>
  
        {/* 🏛 Content */}
        <main className="relative flex-grow w-4/5 mx-auto p-6 glassmorphism sci-fi-border">
          {children}
        </main>
      </div>
    );
  }