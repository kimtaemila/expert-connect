
import * as d3 from 'd3';
import { getKnowledgeGraphData } from './graphDataApi';
import { 
  createDragBehavior,
  validateVisualizationSetup,
  createForceSimulation 
} from './GraphVisualizationHelper';

// Generate interactive network visualization using D3
export async function visualizeNetworkGraph(containerId: string, width = 800, height = 600) {
  try {
    const data = await getKnowledgeGraphData();
    
    // Validate setup
    const container = validateVisualizationSetup(containerId, data);
    if (!container) {
      return null;
    }

    // Clear previous visualization
    container.innerHTML = '';

    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Create force simulation
    const simulation = createForceSimulation(data, width, height);

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.value || 1));

    // Create nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', (d) => d.val)
      .attr('fill', (d) => d.color)
      .call(createDragBehavior(simulation) as any);

    // Add node labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d) => d.name)
      .attr('font-size', '10px')
      .attr('dx', 12)
      .attr('dy', 4)
      .style('pointer-events', 'none')
      .style('fill', '#fff');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => {
          if (d.source && typeof d.source === 'object') return d.source.x || 0;
          return 0;
        })
        .attr('y1', (d) => {
          if (d.source && typeof d.source === 'object') return d.source.y || 0;
          return 0;
        })
        .attr('x2', (d) => {
          if (d.target && typeof d.target === 'object') return d.target.x || 0;
          return 0;
        })
        .attr('y2', (d) => {
          if (d.target && typeof d.target === 'object') return d.target.y || 0;
          return 0;
        });

      node
        .attr('cx', (d) => d.x!)
        .attr('cy', (d) => d.y!);

      labels
        .attr('x', (d) => d.x!)
        .attr('y', (d) => d.y!);
    });

    return simulation;
  } catch (error) {
    console.error('Error visualizing network graph:', error);
    return null;
  }
}
