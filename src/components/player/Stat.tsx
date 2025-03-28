interface StatProps {
  label: string;
  value: string | number | null;
}

export default function Stat({ label, value }: StatProps) {
  return (
    <div className="glassmorphism p-4 rounded-lg border border-blue-500/50 shadow-lg text-center transition-all stat-hover-effect">
      <p className="text-gray-200 text-lg font-extrabold uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-extrabold neon-glow mt-1">{value ?? "N/A"}</p>
    </div>
  );
}