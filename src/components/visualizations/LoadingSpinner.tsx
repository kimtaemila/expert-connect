
import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-expertPurple border-t-transparent animate-spin"></div>
        <p className="mt-4 text-sm text-white/80">Loading Knowledge Graph...</p>
      </div>
    </div>
  );
}
