import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";  // <-- pridaj import

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Sci-Fi RPG",
  description: "Galaktické dobrodružstvo v Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={orbitron.className}>
      <body className="flex flex-col min-h-screen bg-black text-white relative">
        <AuthProvider>
          {/* 🌌 Deep Space Background */}
          <div className="fixed inset-0 bg-stars animate-fadeIn"></div>

          {/* 🔷 Holographic Light Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500 opacity-30 blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500 opacity-30 blur-[80px]"></div>
          </div>

          {/* 🚀 Floating Holographic Circles */}
          <div className="absolute top-1/4 left-1/4 holo-circle floating"></div>
          <div className="absolute bottom-1/4 right-1/4 holo-circle floating"></div>

          <Navbar />

          {/* 💠 Sci-Fi UI Panel (80% width, centered, scrollable if needed) */}
          <main className="flex-grow w-4/5 mx-auto glassmorphism sci-fi-border panel py-8">
            {children}
          </main>

          {/* Toaster pre toast správy */}
          <Toaster position="top-right" />

          {/* 🛸 Footer (Hidden unless needed) */}
          <footer className="w-full text-center text-gray-400 py-4 bg-gray-900 glassmorphism border-t border-gray-800 mt-auto">
            <p>© 2025 Sci-Fi RPG. All rights reserved.</p>
            <p className="text-sm">Developed with 🚀 by Space Dev Team</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
