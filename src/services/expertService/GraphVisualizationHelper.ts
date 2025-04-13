
import * as d3 from 'd3';

// Drag functionality for D3 nodes
export function createDragBehavior(simulation: any) {
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}

// Helper to validate visualization data and container
export function validateVisualizationSetup(containerId: string, data: any) {
  const container = document.getElementById(containerId);
  if (!container || !data.nodes.length) {
    console.error('Missing container or data for visualization');
    return null;
  }
  return container;
}

// Create force simulation with standard settings
export function createForceSimulation(data: any, width: number, height: number) {
  return d3.forceSimulation(data.nodes as any)
    .force('link', d3.forceLink(data.links)
      .id((d: any) => d.id)
      .distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius((d: any) => d.val * 2));
}
