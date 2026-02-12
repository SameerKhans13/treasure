import React, { useState, useEffect } from "react";
import { GameItem } from "../types";

interface DraggableItemProps {
  item: GameItem;
  isInSlot?: boolean;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ item, isInSlot = false }) => {
  const [imgSrc, setImgSrc] = useState(item.src);
  
  // Sync state if prop changes
  useEffect(() => {
    setImgSrc(item.src);
  }, [item.src]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";
    
    // Add a ghost image effect class if desired
    const target = e.target as HTMLDivElement;
    target.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.opacity = "1";
  };

  const handleImageError = () => {
    // Fallback to a placeholder if the local image fails to load
    // Using a reliable placeholder service with the item name
    console.warn(`Failed to load image for ${item.name} (${item.src}). using fallback.`);
    setImgSrc(`https://placehold.co/200x200/3e2723/d4b483?text=${encodeURIComponent(item.name)}`);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        relative cursor-grab active:cursor-grabbing group
        ${isInSlot ? 'w-full h-full' : 'w-20 h-20 md:w-24 md:h-24'}
        transition-transform transform hover:scale-105
      `}
      title={item.name}
    >
      <div className={`
        absolute inset-0 border-2 border-yellow-600/50 rounded-lg pointer-events-none 
        z-10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]
      `}></div>
      <img
        src={imgSrc}
        alt={item.name}
        onError={handleImageError}
        className="w-full h-full object-cover rounded-lg shadow-md sepia-[0.3]"
      />
      {!isInSlot && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs font-bold text-amber-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis px-1">
          {item.name}
        </div>
      )}
    </div>
  );
};