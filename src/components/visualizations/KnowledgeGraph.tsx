
import { useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { KnowledgeGraphLegend } from './KnowledgeGraphLegend';
import { KnowledgeGraphControls } from './KnowledgeGraphControls';
import { LoadingSpinner } from './LoadingSpinner';
import { useGraphData } from './hooks/useGraphData';
import { useGraphInteractions } from './hooks/useGraphInteractions';
import { useGraphScene } from './hooks/useGraphScene';
import { mockGraphData } from '@/data';

interface KnowledgeGraphProps {
  onNodeClick?: (node: any) => void;
}

export function KnowledgeGraph({ onNodeClick }: KnowledgeGraphProps) {
  // Use our custom hooks to manage different aspects of the graph
  const { containerRef, dimensions, graphData, isLoading, error } = useGraphData();
  
  // Ensure data exists and is valid before trying to render
  const validData = {
    nodes: Array.isArray(graphData?.nodes) ? graphData.nodes : [],
    links: Array.isArray(graphData?.links) ? graphData.links : []
  };
  
  const { 
    fgRef, 
    handleNodeHover, 
    handleNodeClick, 
    handleZoomToFit, 
    handleRotateGraph,
    customNodeObject, 
    customLinkWidth, 
    getLinkColor 
  } = useGraphInteractions(validData, onNodeClick);
  
  // Setup the 3D scene
  useGraphScene(fgRef);

  // Handle error state
  if (error) {
    console.error("Graph data error:", error);
    return (
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="p-4 text-white bg-red-500/80 rounded text-center max-w-md">
          <p>Error loading graph data. Using fallback visualization.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ForceGraph3D
          ref={fgRef}
          graphData={validData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel={(node) => node?.name ? `${node.name} (${node.group === 0 ? 'Expert' : node.group === 1 ? 'Topic' : 'Industry'})` : 'Unknown'}
          nodeVal={(node) => node?.val || 5}
          nodeThreeObject={customNodeObject}
          linkWidth={customLinkWidth}
          linkOpacity={0.5} 
          linkColor={getLinkColor}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          enableNodeDrag={true}
          enableNavigationControls={true}
          backgroundColor="rgba(0,0,0,0)"
          nodeAutoColorBy="group"
          warmupTicks={50}
          cooldownTicks={50}
          cooldownTime={1000}
          showNavInfo={false}
        />
      )}

      <KnowledgeGraphLegend />
      <KnowledgeGraphControls 
        onZoomToFit={handleZoomToFit}
        onRotateGraph={handleRotateGraph}
      />
    </div>
  );
}
