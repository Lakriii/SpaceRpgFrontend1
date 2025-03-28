interface InfoCardProps {
    title: string;
    details: { label: string; value: string | number }[];
    borderColor: string;
    glowColor: string;
  }
  
  export default function InfoCard({ title, details, borderColor, glowColor }: InfoCardProps) {
    return (
      <div
        className={`glassmorphism p-5 rounded-xl border ${borderColor} shadow-lg text-center transition-all hover:scale-105`}
      >
        <h4 className={`text-xl font-semibold ${glowColor}`}>{title}</h4>
        {details.map((detail, index) => (
          <p key={index} className="text-sm text-gray-300">
            <span className="font-semibold text-blue-300">{detail.label}:</span> {detail.value}
          </p>
        ))}
      </div>
    );
  }