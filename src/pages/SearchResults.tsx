
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industryExperts } from "@/data/experts";
import { processNaturalLanguage } from "@/services/expertService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>({
    experts: [],
    topics: [],
    connections: []
  });
  
  const [filteredExperts, setFilteredExperts] = useState(industryExperts);
  
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        // Process the search query using NLP
        const nlpResult = await processNaturalLanguage(query);
        
        console.log("NLP Result:", nlpResult);
        
        // Filter experts based on the query
        // For this example, we'll just use a simple string matching approach
        const matchedExperts = industryExperts.filter(expert => {
          const queryLower = query.toLowerCase();
          
          // Check if query contains industry terms
          const industryMatch = expert.industry && 
            queryLower.includes(expert.industry.toLowerCase());
          
          // Check if any skills match
          const skillsMatch = expert.skills && expert.skills.some(skill => 
            queryLower.includes(skill.toLowerCase())
          );
          
          // Check if name matches
          const nameMatch = expert.name.toLowerCase().includes(queryLower);
          
          // Check if title or company matches
          const titleMatch = expert.title && expert.title.toLowerCase().includes(queryLower);
          const companyMatch = expert.company && expert.company.toLowerCase().includes(queryLower);
          
          return industryMatch || skillsMatch || nameMatch || titleMatch || companyMatch;
        });
        
        setResults({
          experts: matchedExperts,
          topics: nlpResult.topics || [],
          connections: []
        });
        
        setFilteredExperts(matchedExperts);
      } catch (error) {
        console.error('Search error:', error);
        // Fallback to simple filtering
        const filtered = industryExperts.filter(expert => 
          expert.name.toLowerCase().includes(query.toLowerCase()) ||
          (expert.skills && expert.skills.join(' ').toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredExperts(filtered);
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      performSearch();
    }
  }, [query]);
  
  const handleExpertClick = (expert: any) => {
    navigate('/dashboard', { state: { selectedExpert: expert } });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-xl font-bold">Search Results</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Results</h4>
                <div>
                  <h5 className="text-sm font-medium mb-2">Industries</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Healthcare", "Finance", "Technology", "Education", "Government"].map(industry => (
                      <Button 
                        key={industry} 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        {industry}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "Cybersecurity", "Data Science", "Leadership", "Compliance"].map(skill => (
                      <Button 
                        key={skill} 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="ghost" size="icon">
            <SlidersHorizontal size={18} />
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground">
            Showing results for: <span className="font-medium text-foreground">{query}</span>
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-6">
          <Tabs defaultValue="experts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="experts">
                Experts ({filteredExperts.length})
              </TabsTrigger>
              <TabsTrigger value="topics">
                Topics ({results.topics.length})
              </TabsTrigger>
              <TabsTrigger value="insights">
                Insights
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="experts">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredExperts.length > 0 ? (
                <div className="space-y-4">
                  {filteredExperts.map((expert) => (
                    <div 
                      key={expert.id} 
                      className="flex items-start p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer"
                      onClick={() => handleExpertClick(expert)}
                    >
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarImage src={expert.image} alt={expert.name} />
                        <AvatarFallback>
                          {getInitials(expert.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{expert.name}</h3>
                        <p className="text-sm text-muted-foreground">{expert.title}</p>
                        
                        {expert.company && (
                          <p className="text-sm mt-1">{expert.company}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {expert.skills && expert.skills.slice(0, 3).map((skill: string, i: number) => (
                            <span key={i} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                              {skill}
                            </span>
                          ))}
                          
                          {expert.skills && expert.skills.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-secondary text-muted-foreground rounded-full">
                              +{expert.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {expert.connectionStrength && (
                        <div className="text-right">
                          <div className="text-sm font-medium">{expert.connectionStrength}% Match</div>
                          <div className="w-16 h-1.5 bg-muted rounded-full mt-1">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{width: `${expert.connectionStrength}%`}}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No experts found</h3>
                  <p className="text-muted-foreground">
                    Try modifying your search terms or filters
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="topics">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : results.topics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.topics.map((topic: string, i: number) => (
                    <div 
                      key={i} 
                      className="p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer"
                    >
                      <h3 className="font-medium">{topic}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 50) + 5} related experts
                        </p>
                        <Button variant="ghost" size="sm">View Topic</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No topics found</h3>
                  <p className="text-muted-foreground">
                    Try modifying your search terms
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Search Insights</h3>
                
                <div className="space-y-4">
                  <p>
                    Based on your search for <strong>"{query}"</strong>, here are some insights:
                  </p>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium mb-2">Key Findings</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Found {filteredExperts.length} experts matching your search criteria</li>
                      <li>Most common skills: Cybersecurity, Healthcare IT, Compliance</li>
                      <li>Primary industries: Healthcare, Technology</li>
                      <li>Average years of experience: 12.5 years</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <p className="text-sm">
                      To refine your search, try adding specific certifications or technical skills.
                      The most relevant experts for this query have backgrounds in both healthcare
                      regulations and information security.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
