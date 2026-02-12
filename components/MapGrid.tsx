import React from "react";
import { MAP_ASSETS } from "../constants";

export const MapGrid: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Fallback for map pieces
    target.src = "https://placehold.co/400x400/3e2723/d4b483?text=Map+Fragment";
  };

  return (
    <div className="p-4 bg-amber-100/50 rounded shadow-inner border border-amber-900/20">
      <h2 className="pirate-font text-2xl text-center mb-4 text-amber-900 border-b-2 border-amber-900/20 pb-2 inline-block w-full">
        The Map Fragments
      </h2>
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto aspect-square p-2 bg-amber-800 rounded-lg shadow-xl">
        {MAP_ASSETS.map((src, idx) => (
          <div key={idx} className="relative overflow-hidden rounded border border-amber-600/50 group">
             <div className="absolute inset-0 bg-amber-500/10 mix-blend-multiply pointer-events-none z-10"></div>
            <div>{src}</div>
            <img 
              src={src} 
              alt={`Map Fragment ${idx + 1}`} 
              onError={handleImageError}
              className="w-full h-full object-cover sepia-[0.6] brightness-90 contrast-125 transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
      <p className="text-center italic mt-4 text-amber-800/80 text-sm">
        "Assemble the artifacts in the order revealed by the ancients..."
      </p>
    </div>
  );
};