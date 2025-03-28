interface InfoSectionProps {
    title: string;
    icon?: string;
    colorClass: string;
    shadowColor: string;
    children: React.ReactNode;
    emptyMessage?: string;
    isEmpty: boolean;
  }
  
  export default function InfoSection({
    title,
    icon,
    colorClass,
    shadowColor,
    children,
    emptyMessage = "No data available.",
    isEmpty,
  }: InfoSectionProps) {
    return (
      <div className="mt-6">
        <h3
          className={`text-2xl font-bold ${colorClass} text-center`}
          style={{ textShadow: `0px 0px 12px ${shadowColor}, 0px 0px 24px ${shadowColor}` }}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
  
        {isEmpty ? (
          <p className="text-center text-gray-400 mt-4">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{children}</div>
        )}
      </div>
    );
  }