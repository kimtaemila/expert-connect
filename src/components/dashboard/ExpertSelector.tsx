
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Expert } from "@/data/types";
import { getInitials } from "@/lib/utils";

interface ExpertSelectorProps {
  experts: Expert[];
  onExpertSelect: (expert: Expert) => void;
  selectedIndustry: string | null;
  setSelectedIndustry: (industry: string | null) => void;
}

export function ExpertSelector({ 
  experts, 
  onExpertSelect, 
  selectedIndustry, 
  setSelectedIndustry 
}: ExpertSelectorProps) {
  const [showExpertList, setShowExpertList] = useState(false);
  
  // Get unique industries from experts
  const industries = [...new Set(experts.map(expert => expert.industry))].filter(Boolean) as string[];
  
  // Filter experts by selected industry
  const filteredExperts = selectedIndustry 
    ? experts.filter(expert => expert.industry === selectedIndustry)
    : experts;
    
  const handleExpertSelect = (expert: Expert) => {
    onExpertSelect(expert);
    setShowExpertList(false);
  };

  return (
    <div className="border-b border-border p-4">
      <div className="relative">
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => setShowExpertList(!showExpertList)}
        >
          <span>Select Expert</span>
          <ChevronDown size={16} className={`transition-transform ${showExpertList ? 'rotate-180' : ''}`} />
        </Button>
        
        {showExpertList && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-border shadow-lg rounded-md overflow-hidden">
            <div className="p-2 border-b border-border">
              <div className="flex flex-wrap gap-1">
                <Button 
                  size="sm" 
                  variant={selectedIndustry === null ? "default" : "outline"} 
                  className="text-xs"
                  onClick={() => setSelectedIndustry(null)}
                >
                  All
                </Button>
                {industries.map((industry) => (
                  <Button 
                    key={industry} 
                    size="sm" 
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    className="text-xs"
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {filteredExperts.map((expert) => (
                <div 
                  key={expert.id} 
                  className="flex items-center p-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleExpertSelect(expert)}
                >
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src={expert.image} alt={expert.name} />
                    <AvatarFallback className="text-xs">
                      {getInitials(expert.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{expert.name}</div>
                    <div className="text-xs text-muted-foreground">{expert.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
