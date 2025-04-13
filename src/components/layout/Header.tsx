
import { useState } from "react";
import { Zap, User, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  
  const handleNewAnalysis = () => {
    navigate('/analysis');
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2" onClick={handleNewAnalysis}>
          <Zap size={16} className="text-primary" />
          <span>New Analysis</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleProfileClick}>
          <User size={20} />
        </Button>
      </div>
    </div>
  );
}

export function SearchHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <div className="p-4 border-b border-border">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          placeholder="Ask a question about experts (e.g., 'Show me cybersecurity experts with healthcare experience')"
          className="w-full px-4 py-2 pl-10 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 h-5 w-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Button type="submit" variant="ghost" size="icon" className="absolute right-1">
          <Filter size={18} />
        </Button>
      </form>
    </div>
  );
}
