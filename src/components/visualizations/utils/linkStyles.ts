
import * as THREE from 'three';

/**
 * Create particle system for link animation
 */
export const createLinkParticles = (link: any, startPos: THREE.Vector3, endPos: THREE.Vector3) => {
  const particleCount = 20;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  
  // Position particles along the link
  for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount;
    positions[i * 3] = startPos.x + (endPos.x - startPos.x) * t;
    positions[i * 3 + 1] = startPos.y + (endPos.y - startPos.y) * t;
    positions[i * 3 + 2] = startPos.z + (endPos.z - startPos.z) * t;
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // Particle material
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  return new THREE.Points(particles, particleMaterial);
};
