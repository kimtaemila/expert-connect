
import { useState, useEffect, useRef } from 'react';
import { mockGraphData } from '@/data';
import { getKnowledgeGraphData } from '@/services/expertService/graphDataApi';

/**
 * Custom hook to manage graph data and dimensions
 */
export function useGraphData() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [graphData, setGraphData] = useState<{nodes: any[], links: any[]}>({
    nodes: mockGraphData.nodes || [],
    links: mockGraphData.links || []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch live data with fallback to mock data
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const liveData = await getKnowledgeGraphData();
        
        // Only use live data if it's valid and has nodes and links
        if (liveData && Array.isArray(liveData.nodes) && Array.isArray(liveData.links)) {
          console.log("Successfully fetched graph data:", liveData);
          setGraphData(liveData);
        } else {
          console.warn("Invalid live data format, using mock data");
          setGraphData(mockGraphData);
        }
      } catch (err) {
        console.error("Error fetching graph data:", err);
        setError(err instanceof Error ? err : new Error("Unknown error fetching graph data"));
        // On error, ensure mockGraphData is used
        setGraphData(mockGraphData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLiveData();
  }, []);

  // Handle container resizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ 
          width: clientWidth || 800, 
          height: Math.max(500, clientHeight || 500) 
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Always guarantee safe default data structure
  const safeGraphData = {
    nodes: Array.isArray(graphData?.nodes) ? graphData.nodes : mockGraphData.nodes,
    links: Array.isArray(graphData?.links) ? graphData.links : mockGraphData.links
  };

  return {
    containerRef,
    dimensions,
    graphData: safeGraphData,
    isLoading,
    setGraphData,
    error,
    setError
  };
}
