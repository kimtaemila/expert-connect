import { aiConfidenceScores } from "@/data/index";

interface ScoreBarProps {
  label: string;
  value: number;
  color?: string;
}

function ScoreBar({ label, value, color = "bg-primary" }: ScoreBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-primary">{value}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

export function ConfidenceScores() {
  return (
    <div className="bg-card p-6 rounded-xl">
      <h2 className="text-lg font-medium mb-4">AI Confidence Scores</h2>
      
      <div>
        <ScoreBar label="Expert Matching" value={aiConfidenceScores.expertMatching} />
        <ScoreBar label="Topic Relevance" value={aiConfidenceScores.topicRelevance} />
        <ScoreBar label="Insight Extraction" value={aiConfidenceScores.insightExtraction} />
        <ScoreBar label="Trend Detection" value={aiConfidenceScores.trendDetection} />
      </div>
    </div>
  );
}
