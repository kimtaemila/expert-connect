
import { Expert } from "@/data/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface ExpertDetailsProps {
  expert: Expert;
}

export function ExpertDetails({ expert }: ExpertDetailsProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-8">Expert Details</h2>
      
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={expert.image || expert.imageUrl} alt={expert.name} />
          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
            {getInitials(expert.name)}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="text-2xl font-bold">{expert.name}</h3>
        <p className="text-muted-foreground">{expert.title}</p>
        {expert.company && (
          <p className="text-sm text-muted-foreground mt-1">{expert.company}</p>
        )}
      </div>
      
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Expertise</h4>
        <div className="flex flex-wrap gap-2">
          {expert.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Connection Strength</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Strong Match</span>
            <span>{expert.connectionStrength}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${expert.connectionStrength}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2">Recent Insights</h4>
        <div className="space-y-4">
          {expert.insights.map((insight, i) => (
            <p key={i} className="text-sm">
              "{insight}"
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
