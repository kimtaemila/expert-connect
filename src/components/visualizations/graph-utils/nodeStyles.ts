
import * as THREE from 'three';

export function getNodeColor(node: any) {
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
}

export function getNodeSize(node: any) {
  const baseSize = node.val || 10;
  
  switch(node.group) {
    case 0: // Experts
      return baseSize * 1.2;
    case 1: // Skills/Topics
      return baseSize * 0.9;
    case 2: // Industries
      return baseSize * 1.5;
    default:
      return baseSize;
  }
}

export function createNodeObject(node: any, highlightNodes: Set<unknown>, hoverNode: any) {
  const isHighlighted = hoverNode === node || 
                       (highlightNodes.size && highlightNodes.has(node.id));
  
  const nodeMaterial = new THREE.MeshLambertMaterial({
    color: node.color,
    transparent: true,
    opacity: isHighlighted ? 1 : 0.8
  });
  
  return new THREE.Mesh(
    new THREE.SphereGeometry(node.val),
    nodeMaterial
  );
}

export function getLinkColor(link: any, highlightLinks: Set<unknown>) {
  const isHighlight = highlightLinks.has(link);
  return isHighlight ? '#ffffff' : '#adb5bd';
}
