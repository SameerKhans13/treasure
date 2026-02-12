import React from "react";
import { VICTORY_IMAGE } from "../constants";

interface WinModalProps {
  onClose: () => void; // Optional reset
}

export const WinModal: React.FC<WinModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>
      
      {/* Modal Content */}
      <div className="relative bg-amber-100 w-full max-w-2xl rounded-lg shadow-[0_0_50px_rgba(251,191,36,0.5)] border-4 border-yellow-600 p-8 text-center transform animate-bounce-in wood-pattern overflow-hidden">
        {/* Decorative Corner */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-600 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-600 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-600 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-600 rounded-br-lg"></div>

        {/* Content Container (Parchment style) */}
        <div className="parchment-bg p-6 rounded shadow-inner border border-amber-900/20 relative z-10">
          <h2 className="pirate-font text-4xl md:text-5xl text-amber-900 mb-6 drop-shadow-md">
            Treasure Unlocked!
          </h2>
          
          <div className="mb-6 p-2 bg-amber-900/10 rounded-lg inline-block">
             <img 
               src={VICTORY_IMAGE} 
               alt="The Treasure" 
               className="max-h-64 rounded shadow-lg border-2 border-amber-900/40 sepia-[0.2]"
             />
          </div>
          
          <p className="text-xl text-amber-900 mb-8 italic">
            "Ye have cracked the code, Captain! The spoils are yours!"
          </p>

          <button
            onClick={onClose}
            className="px-8 py-3 bg-amber-900 text-yellow-100 font-bold rounded border-2 border-yellow-600 hover:bg-amber-800 hover:text-white transition-colors shadow-lg pirate-font text-xl uppercase tracking-widest"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
