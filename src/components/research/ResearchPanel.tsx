'use client';

type ResearchPanelProps = {
  selectedResearch: any | null;
  onClose: () => void;
  onStartResearch: (research: any) => void;
};

export default function ResearchPanel({ selectedResearch, onClose, onStartResearch }: ResearchPanelProps) {
  if (!selectedResearch) return null;

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-gray-900 text-white p-6 shadow-2xl z-50 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{selectedResearch.name}</h2>
      <p className="mb-4">{selectedResearch.effect}</p>
      <p className="mb-4 text-sm text-gray-400">
        Čas potrebný na výskum: {selectedResearch.timeRequired || 'Nešpecifikovaný'}
      </p>
      <button
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-4"
        onClick={() => onStartResearch(selectedResearch)}
      >
        Spustiť výskum
      </button>
      <button
        className="text-sm text-gray-400 hover:text-white underline"
        onClick={onClose}
      >
        Zavrieť
      </button>
    </div>
  );
}
