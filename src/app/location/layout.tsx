export default function CurrentLocationLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen flex flex-col bg-black text-white">
        {/* 🌌 Holografické Pozadie */}
        <div className="fixed inset-0 bg-stars animate-fadeIn"></div>
  
        {/* 🏛 Nadpis */}
        <header className="text-center py-6 text-3xl font-bold neon-glow">
          📍 Current Location
        </header>
  
        {/* 🛰 Sidebar */}
        <div className="flex flex-grow">
          <aside className="w-72 bg-gray-900 glassmorphism p-6 sci-fi-border">
            <nav className="flex flex-col space-y-3">
              <SidebarLink href="/location" icon="🏛" label="Overview" />
              <SidebarLink href="/location/trade" icon="🛒" label="Trade" />
              <SidebarLink href="/location/npcs" icon="👤" label="NPCs" />
              <SidebarLink href="/location/research" icon="🔬" label="Research" />
              <SidebarLink href="/location/mining" icon="⛏" label="Mining" />
            </nav>
          </aside>
  
          {/* 🌟 Hlavný obsah */}
          <main className="flex-1 p-10 min-w-0">
            <div className="glassmorphism p-6 rounded-xl w-full">{children}</div>
          </main>
        </div>
      </div>
    );
  }
  
  /* 🔷 Sidebar Navigation Link */
  function SidebarLink({ href, icon, label }: { href: string; icon: string; label: string }) {
    return (
      <a
        href={href}
        className="flex items-center space-x-3 p-4 rounded-lg text-lg font-semibold transition-all duration-300 
                   bg-gray-800/50 border border-transparent hover:border-blue-400 hover:bg-gray-800 hover:text-blue-400"
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </a>
    );
  }