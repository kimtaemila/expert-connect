
import { useState } from "react";
import { KnowledgeGraph } from "@/components/visualizations/KnowledgeGraph";
import { ErrorBoundary } from "react-error-boundary";

interface GraphContainerProps {
  onNodeClick: (node: any) => void;
}

export function GraphContainer({ onNodeClick }: GraphContainerProps) {
  const [hasError, setHasError] = useState(false);
  
  // Error handler for the error boundary
  const handleError = (error: Error) => {
    console.error("Knowledge Graph error:", error);
    setHasError(true);
  };
  
  // Reset error state when trying again
  const handleReset = () => {
    setHasError(false);
  };
  
  return (
    <div className="mb-6">
      <div className="mb-3 p-4 bg-card rounded-lg border border-border/30">
        <h3 className="text-lg font-medium mb-2">Expert Knowledge Network</h3>
        <p className="text-sm text-muted-foreground">
          This interactive 3D visualization maps the knowledge ecosystem, connecting experts (purple), 
          skills/topics (cyan), and industries (orange) through a dynamic network graph. 
          <span className="block mt-1">
            <strong>Interactive features:</strong> Hover over nodes to highlight connections, click on any node to explore 
            detailed information, and use the controls to rotate and zoom the graph.
          </span>
        </p>
      </div>
      
      <ErrorBoundary 
        fallback={
          <div className="bg-card rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-2">Unable to load the knowledge graph visualization.</p>
            <p className="text-sm text-muted-foreground mb-4">The visualization will use mock data instead of live data.</p>
            <button 
              onClick={handleReset} 
              className="mt-4 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        } 
        onError={handleError}
        onReset={handleReset}
        resetKeys={[hasError]} // Add resetKeys to properly handle resets
      >
        {!hasError && <KnowledgeGraph onNodeClick={onNodeClick} />}
      </ErrorBoundary>
    </div>
  );
}
