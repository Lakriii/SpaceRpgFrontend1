export default function StatBox({ label, value }: { label: string; value: string | number | null }) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg text-center hover:shadow-md transition-all">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-xl font-bold neon-glow">{value ?? "N/A"}</p>
      </div>
    );
  }