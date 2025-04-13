
import * as THREE from 'three';

/**
 * Setup lighting for better 3D effects
 */
export const setupSceneLighting = (scene: THREE.Scene) => {
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(200, 200, 200);
  scene.add(directionalLight);
  
  // Add point light for highlights
  const pointLight = new THREE.PointLight(0x8B5CF6, 1, 100);
  pointLight.position.set(0, 0, 50);
  scene.add(pointLight);
  
  return { ambientLight, directionalLight, pointLight };
};

/**
 * Setup background with gradient or particles
 */
export const setupBackground = (scene: THREE.Scene) => {
  // Create a particle system for background
  const particleCount = 500;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 1000;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x8B5CF6,
    size: 1,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending
  });
  
  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);
  
  return particleSystem;
};
