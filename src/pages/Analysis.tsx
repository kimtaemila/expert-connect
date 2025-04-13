
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Share } from "lucide-react";

export default function Analysis() {
  const navigate = useNavigate();
  const [analysisName, setAnalysisName] = useState("New Analysis");
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </Button>
          <input
            type="text"
            value={analysisName}
            onChange={(e) => setAnalysisName(e.target.value)}
            className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 rounded"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Share size={16} />
            <span>Share</span>
          </Button>
          <Button className="gap-2">
            <Save size={16} />
            <span>Save Analysis</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="query" className="flex-1 flex flex-col">
        <div className="border-b border-border">
          <TabsList className="w-full justify-start h-auto p-0">
            <TabsTrigger value="query" className="px-8 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Query
            </TabsTrigger>
            <TabsTrigger value="visualization" className="px-8 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Visualization
            </TabsTrigger>
            <TabsTrigger value="insights" className="px-8 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Insights
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="query" className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Create Analysis Query</h2>
            <div className="rounded-lg border border-border p-4 mb-6">
              <label className="text-sm text-muted-foreground mb-2 block">Ask a question about experts</label>
              <textarea 
                className="w-full h-32 bg-secondary rounded-md p-3 text-foreground border-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g., Show me cybersecurity experts with healthcare experience"
              />
              <div className="flex justify-end mt-4">
                <Button>Run Query</Button>
              </div>
            </div>
            
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium mb-4">Query History</h3>
              <div className="space-y-2">
                {["Show me cybersecurity experts with healthcare experience", 
                  "Find experts in AI ethics", 
                  "List experts with regulatory compliance skills"].map((query, i) => (
                  <div key={i} className="p-3 bg-secondary rounded-md hover:bg-secondary/80 cursor-pointer">
                    {query}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="visualization" className="flex-1 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Run a query to generate visualizations</h3>
              <p className="text-muted-foreground">
                Your query results will be displayed as interactive visualizations here
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="flex-1 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">AI-Generated Insights</h3>
              <p className="text-muted-foreground">
                After running a query, AI will analyze the results and provide insights here
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
