
import React from 'react';

export function KnowledgeGraphLegend() {
  return (
    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-md p-3">
      <h4 className="text-sm font-medium mb-2 text-white">Graph Legend</h4>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-[#8B5CF6] inline-block mr-2"></span>
          <span className="text-white/90">Experts</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-[#06B6D4] inline-block mr-2"></span>
          <span className="text-white/90">Skills & Topics</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-[#FB923C] inline-block mr-2"></span>
          <span className="text-white/90">Industries</span>
        </div>
      </div>
    </div>
  );
}
