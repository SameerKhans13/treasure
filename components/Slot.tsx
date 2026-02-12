import React from "react";
import { GameItem } from "../types";
import { DraggableItem } from "./DraggableItem";

interface SlotProps {
  index: number;
  item: GameItem | null;
  onDrop: (index: number, itemId: string) => void;
  onClear: (index: number) => void;
}

export const Slot: React.FC<SlotProps> = ({ index, item, onDrop, onClear }) => {
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) {
      onDrop(index, itemId);
    }
  };

  // Allow dragging item OUT of slot to clear it (if dropped elsewhere or nowhere specific, handled by parent, 
  // but dragging out usually implies moving it. 
  // Here we just render the DraggableItem which handles the drag start).
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="pirate-font text-amber-900/60 font-bold text-sm">Slot {index + 1}</div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 
          transition-all duration-300 flex items-center justify-center
          ${isOver 
            ? "border-yellow-400 bg-yellow-400/20 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]" 
            : "border-amber-900/30 bg-black/10 inner-shadow"}
          ${item ? "border-amber-700 bg-amber-100" : "border-dashed"}
        `}
      >
        {item ? (
           <DraggableItem item={item} isInSlot={true} />
        ) : (
          <div className="text-4xl text-amber-900/20 font-serif opacity-50 select-none">?</div>
        )}
      </div>
      
      {/* Optional: Clear button for mobile accessibility or convenience */}
      {item && (
         <button 
           onClick={() => onClear(index)}
           className="text-xs text-red-800 hover:text-red-600 underline font-serif"
         >
           Remove
         </button>
      )}
    </div>
  );
};
