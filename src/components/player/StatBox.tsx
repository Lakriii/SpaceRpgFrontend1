export default function StatBox({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg text-center hover:shadow-md transition-all min-w-[140px] max-w-[180px]">
      <p className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </p>
      <p className="text-xl font-bold neon-glow whitespace-nowrap overflow-hidden text-ellipsis">
        {value ?? "N/A"}
      </p>
    </div>
  );
}
