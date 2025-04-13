
import { useEffect } from 'react';
import { setupSceneLighting, setupBackground } from '../utils/sceneSetup';

/**
 * Custom hook to setup and configure the 3D scene
 */
export function useGraphScene(fgRef: React.RefObject<any>) {
  useEffect(() => {
    if (!fgRef.current) return;
    
    const scene = fgRef.current.scene();
    setupSceneLighting(scene);
    setupBackground(scene);
    
  }, [fgRef]);
}
