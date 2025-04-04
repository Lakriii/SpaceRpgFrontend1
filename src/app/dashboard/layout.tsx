import Sidebar from "@/components/layout/Sidebar";

const dashboardLinks = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/dashboard/inventory", icon: "🎒", label: "Inventory" },
  { href: "/dashboard/ships", icon: "🚀", label: "Ships" },
  { href: "/dashboard/reputation", icon: "🌟", label: "Reputation" },
];

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
  
        <Sidebar links={dashboardLinks} /> {/* Dynamické odkazy */}
  
          {/* 🌟 Main Content (scrollable) */}
          <main className="flex-1 p-10 min-w-0 overflow-y-auto">
            <div className="glassmorphism p-6 rounded-xl w-full">{children}</div>
          </main>
        </div>
     
    );
  }
 