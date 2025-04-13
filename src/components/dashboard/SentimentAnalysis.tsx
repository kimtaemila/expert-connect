import { sentimentData } from "@/data/index";

interface SentimentBarProps {
  label: string;
  value: number;
  color: string;
}

function SentimentBar({ label, value, color }: SentimentBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm px-3 py-1 rounded-full text-xs font-medium uppercase" 
          style={{ backgroundColor: `${color}20`, color }}>
          {label}
        </span>
        <span className="text-sm">{value}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3">
        <div 
          className="h-3 rounded-full" 
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

export function SentimentAnalysis() {
  return (
    <div className="bg-card p-6 rounded-xl">
      <h2 className="text-lg font-medium mb-4">Sentiment Analysis</h2>
      
      <div>
        <SentimentBar 
          label="POSITIVE" 
          value={sentimentData.positive} 
          color="#6366F1" 
        />
        <SentimentBar 
          label="NEUTRAL" 
          value={sentimentData.neutral} 
          color="#FBBF24" 
        />
        <SentimentBar 
          label="NEGATIVE" 
          value={sentimentData.negative} 
          color="#EF4444" 
        />
      </div>
    </div>
  );
}
