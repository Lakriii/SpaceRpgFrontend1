import Navbar from "@/components/layout/Navbar";

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-black text-white flex relative overflow-hidden">
    
      <main className="relative flex-1 p-8 w-full mx-auto glassmorphism sci-fi-border">
        {children}
      </main>
    </div>
  );
}