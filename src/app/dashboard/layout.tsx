export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen w-full bg-black text-white flex relative overflow-hidden">
        {/* 🌌 Sci-Fi Background */}
        <div className="fixed inset-0 bg-stars animate-fadeIn"></div>
  
        {/* 💠 Neon Glow Light Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-500 opacity-30 blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500 opacity-30 blur-[80px]"></div>
        </div>
  
        {/* 🚀 Dashboard Container (full width fix) */}
        <div className="flex flex-grow w-full min-w-0">
          {/* 🔷 Sidebar */}
          <aside className="w-72 shrink-0 bg-gray-900 glassmorphism p-6 sci-fi-border">
            <nav className="flex flex-col space-y-3">
              <SidebarLink href="/dashboard" icon="🏠" label="Dashboard" />
              <SidebarLink href="/dashboard/inventory" icon="🎒" label="Inventory" />
              <SidebarLink href="/dashboard/ships" icon="🚀" label="Ships" />
              <SidebarLink href="/dashboard/reputation" icon="🌟" label="Reputation" />
            </nav>
          </aside>
  
          {/* 🌟 Main Content (scrollable) */}
          <main className="flex-1 p-10 min-w-0 overflow-y-auto">
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