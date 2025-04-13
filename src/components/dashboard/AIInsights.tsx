
import { aiGeneratedInsights, skillGapTags } from "@/data/index";
import { Zap } from "lucide-react";

export function AIInsights() {
  return (
    <div className="bg-card p-6 rounded-xl">
      <h2 className="text-lg font-medium mb-4">AI-Generated Insights</h2>
      
      <div className="space-y-6">
        {aiGeneratedInsights.map((insight, index) => (
          <div key={index} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex gap-3 items-center mb-2">
              <div className="bg-primary/20 p-1.5 rounded-md">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-medium">{insight.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{insight.content}</p>
            
            {index === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skillGapTags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
