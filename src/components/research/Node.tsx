'use client';

type NodeProps = {
  name: string;
  effect: string;
  status: string;
  timeRequired: string;
};

export default function Node({ name, effect, status, timeRequired }: NodeProps) {
  const bgColor =
    status === 'completed' ? 'bg-green-600' :
    status === 'unlocked' ? 'bg-blue-600' :
    'bg-gray-600';

  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-lg w-full h-full flex flex-col justify-center items-center text-center cursor-pointer`}>
      <h3 className="font-bold">{name}</h3>
      <p className="text-xs mt-2">{effect}</p>
      {timeRequired && <small className="mt-1 text-gray-300">Čas: {timeRequired}</small>}
    </div>
  );
}



/*/components/
  /research/
    Node.tsx            # Tvoj existujúci Node komponent
    ResearchGrid.tsx    # Mriežka výskumov (grid s výskumami)
    ResearchPanel.tsx   # Bočný panel s detailmi výskumu + tlačidlom "Spustiť výskum"
    Notification.tsx    # Komponent na zobrazovanie upozornení

/pages/
  index.tsx             # Hlavná stránka, kde sa tie komponenty používajú a riadia logiku

/types/
  research.ts           # Typy ResearchNode, SubResearch

/api/
  research/
    complete.ts         # API endpoint na označenie výskumu ako dokončeného*/ 
