
import { useState, useCallback, useRef, useEffect } from 'react';
import { createNodeObject, createHighlightedNodeObject } from '../utils/nodeStyles';

/**
 * Custom hook to handle graph interactions
 */
export function useGraphInteractions(graphData: any, onNodeClick?: (node: any) => void) {
  // Validate graphData to ensure it has the expected structure
  const validGraphData = {
    nodes: Array.isArray(graphData?.nodes) ? graphData.nodes : [],
    links: Array.isArray(graphData?.links) ? graphData.links : []
  };

  const fgRef = useRef<any>();
  const [highlightedNode, setHighlightedNode] = useState<any>(null);
  const [highlightedLinks, setHighlightedLinks] = useState<any[]>([]);
  
  // Setup scene with enhanced lighting and background
  useEffect(() => {
    if (!fgRef.current) return;
    
    // Initial camera position to show the graph nicely
    fgRef.current.cameraPosition({ z: 140 });
    
    // Auto-rotate the graph slightly for visual interest
    let angle = 0;
    const autoRotate = setInterval(() => {
      if (fgRef.current && !highlightedNode) {
        angle += 0.0005;
        fgRef.current.scene().rotation.y = angle;
      }
    }, 30);
    
    return () => clearInterval(autoRotate);
  }, [fgRef.current, highlightedNode]);

  // Handle node highlighting on hover with safeguards for undefined data
  const handleNodeHover = useCallback((node: any) => {
    if (!node) {
      setHighlightedNode(null);
      setHighlightedLinks([]);
      return;
    }
    
    if (!validGraphData || !Array.isArray(validGraphData.links)) {
      // If there's no valid graph data, don't attempt to highlight anything
      return;
    }
    
    // Make sure graphData and graphData.links exist before filtering
    const links = validGraphData.links || [];
    const relatedLinks = links.filter(link => 
      link && (
        link.source === node.id || 
        (typeof link.source === 'object' && link.source?.id === node.id) || 
        link.target === node.id || 
        (typeof link.target === 'object' && link.target?.id === node.id)
      )
    );
    
    setHighlightedNode(node);
    setHighlightedLinks(relatedLinks);
    
    if (fgRef.current) {
      // Update the rendering to show highlighted node
      fgRef.current.refresh();
    }
  }, [validGraphData]);

  // Handle node selection on click
  const handleNodeClick = useCallback((node: any) => {
    if (!node || !fgRef.current) return;
    
    // Stop auto-rotation when a node is selected
    setHighlightedNode(node);
    
    // Zoom to node with smooth animation
    const distance = 60;
    const distRatio = 1 + distance/Math.hypot(node.x || 0, node.y || 0, node.z || 0);
    
    fgRef.current.cameraPosition(
      { 
        x: (node.x || 0) * distRatio, 
        y: (node.y || 0) * distRatio, 
        z: (node.z || 0) * distRatio 
      },
      node,
      1500
    );
    
    // Call the callback if provided
    if (onNodeClick) {
      onNodeClick(node);
    }
  }, [onNodeClick]);

  // Handle zoom to fit the entire graph
  const handleZoomToFit = useCallback(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(800, 30);
      setHighlightedNode(null);
      setHighlightedLinks([]);
    }
  }, []);

  // Handle manual rotation of the graph
  const handleRotateGraph = useCallback(() => {
    if (fgRef.current) {
      const currentRotation = fgRef.current.scene().rotation;
      fgRef.current.scene().rotation.y = currentRotation.y + Math.PI / 4;
    }
  }, []);

  // Custom node object generator based on highlight state
  const customNodeObject = useCallback((node: any) => {
    if (!node) return null;
    
    if (highlightedNode && highlightedNode.id === node.id) {
      return createHighlightedNodeObject(node);
    }
    
    if (highlightedNode && highlightedLinks.some(
      link => link && (
        (link.source === node.id || (typeof link.source === 'object' && link.source?.id === node.id)) || 
        (link.target === node.id || (typeof link.target === 'object' && link.target?.id === node.id))
      )
    )) {
      // Highlight related nodes
      return createHighlightedNodeObject({...node, val: node.val * 1.2});
    }
    
    return createNodeObject(node);
  }, [highlightedNode, highlightedLinks]);

  // Custom link width based on highlight state
  const customLinkWidth = useCallback((link: any) => {
    if (!link) return 1.0;
    
    const sourceId = typeof link.source === 'object' ? link.source?.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target?.id : link.target;
    
    if (highlightedNode &&
       (sourceId === highlightedNode.id || targetId === highlightedNode.id)) {
      return 2.5;  // Highlighted links are thicker
    }
    return 1.5;
  }, [highlightedNode]);

  // Link color with opacity control based on highlight state
  const getLinkColor = useCallback((link: any) => {
    if (!link) return 'rgba(255, 255, 255, 0.3)';
    if (!highlightedNode) return 'rgba(255, 255, 255, 0.5)';
    
    const sourceId = typeof link.source === 'object' ? link.source?.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target?.id : link.target;
    
    if (sourceId === highlightedNode.id || targetId === highlightedNode.id) {
      return 'rgba(255, 255, 255, 0.8)';  // Highlighted links are more visible
    }
    return 'rgba(255, 255, 255, 0.2)';  // Other links are more transparent
  }, [highlightedNode]);

  return {
    fgRef,
    highlightedNode,
    highlightedLinks,
    handleNodeHover,
    handleNodeClick,
    handleZoomToFit,
    handleRotateGraph,
    customNodeObject,
    customLinkWidth,
    getLinkColor
  };
}
