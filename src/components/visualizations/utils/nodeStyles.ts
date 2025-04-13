
import * as THREE from 'three';

/**
 * Function to determine node color based on group
 */
export const getNodeColor = (node: any) => {
  switch(node.group) {
    case 0: // Experts
      return '#8B5CF6';
    case 1: // Skills/Topics
      return '#06B6D4';
    case 2: // Industries
      return '#FB923C';
    default:
      return '#94A3B8';
  }
};

/**
 * Node object creator function with enhanced visuals
 */
export const createNodeObject = (node: any, highlighted = false) => {
  const color = getNodeColor(node);
  const nodeSize = node.val || 10;
  
  // Create a material with glow effect when highlighted
  const material = new THREE.MeshLambertMaterial({
    color: color,
    emissive: highlighted ? color : '#000000',
    emissiveIntensity: highlighted ? 0.5 : 0,
    transparent: true,
    opacity: highlighted ? 0.95 : 0.8
  });
  
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(nodeSize),
    material
  );
  
  // Add an optional glow effect for important nodes (larger size)
  if (node.val > 15 || highlighted) {
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.15
    });
    
    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(nodeSize * 1.4),
      glowMaterial
    );
    
    sphere.add(glowSphere);
  }

  return sphere;
};

/**
 * Create a node object with hover effect
 */
export const createHighlightedNodeObject = (node: any) => {
  return createNodeObject(node, true);
};
