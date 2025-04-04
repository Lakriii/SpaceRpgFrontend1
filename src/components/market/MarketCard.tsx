"use client";

import Link from "next/link";

interface MarketCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  textColor: string;
}

export default function MarketCard({ href, icon, title, description, textColor }: MarketCardProps) {
  return (
    <Link href={href}>
      <div className="glassmorphism p-6 rounded-lg hover:scale-105 transition-all text-center cursor-pointer">
        <h3 className={`text-xl font-semibold ${textColor}`}>{icon} {title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </Link>
  );
}
