
import React from 'react';

interface KnowledgeGraphControlsProps {
  onZoomToFit: () => void;
  onRotateGraph: () => void;
}

export function KnowledgeGraphControls({ onZoomToFit, onRotateGraph }: KnowledgeGraphControlsProps) {
  return (
    <>
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          className="p-2 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          onClick={onZoomToFit}
          aria-label="Zoom to fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6"></path>
            <path d="M9 21H3v-6"></path>
            <path d="M21 3l-7 7"></path>
            <path d="M3 21l7-7"></path>
          </svg>
        </button>
        <button 
          className="p-2 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          onClick={onRotateGraph}
          aria-label="Rotate graph"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
          </svg>
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-md p-3 text-xs text-white/80">
        <p>Hover over nodes to see labels</p>
        <p>Click a node to focus and select</p>
      </div>
    </>
  );
}
