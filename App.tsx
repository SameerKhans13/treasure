import React, { useState, useEffect, useMemo } from "react";
import { MapGrid } from "./components/MapGrid";
import { Slot } from "./components/Slot";
import { DraggableItem } from "./components/DraggableItem";
import { WinModal } from "./components/WinModal";
import { INVENTORY_ITEMS, TOTAL_SLOTS, WINNING_SEQUENCE } from "./constants";
import { SlotState, GameItem } from "./types";

const App: React.FC = () => {
  // State to track which item is in which slot
  const [slots, setSlots] = useState<SlotState>({});
  
  // State for win condition
  const [isWon, setIsWon] = useState(false);

  // Derive inventory items: Items that are NOT currently in any slot
  const inventoryItems = useMemo(() => {
    const placedItemIds = Object.values(slots).filter((id): id is string => id !== null);
    return INVENTORY_ITEMS.filter(item => !placedItemIds.includes(item.id));
  }, [slots]);

  // Handle dropping an item into a specific slot
  const handleDropOnSlot = (slotIndex: number, itemId: string) => {
    setSlots(prev => {
      // 1. Check if this item is already in another slot. If so, remove it from old slot.
      const prevSlotOfItem = Object.keys(prev).find(key => prev[Number(key)] === itemId);
      
      const newSlots = { ...prev };
      
      if (prevSlotOfItem) {
        newSlots[Number(prevSlotOfItem)] = null;
      }

      // 2. If the target slot has an item, "swap" is tricky without extra logic. 
      // For simplicity, we just overwrite (the old item goes back to inventory automatically via derived state).
      // Or we could implement swap. Let's stick to overwrite -> old item returns to inventory.
      
      newSlots[slotIndex] = itemId;
      return newSlots;
    });
  };

  // Handle removing an item from a slot (returning to inventory)
  const handleRemoveFromSlot = (slotIndex: number) => {
    setSlots(prev => {
      const newSlots = { ...prev };
      newSlots[slotIndex] = null;
      return newSlots;
    });
  };

  // Handle dropping item back onto inventory area (remove from slot)
  const handleDropOnInventory = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    
    // Find which slot it came from, if any
    const slotIndexStr = Object.keys(slots).find(key => slots[Number(key)] === itemId);
    
    if (slotIndexStr) {
      handleRemoveFromSlot(Number(slotIndexStr));
    }
  };

  const handleDragOverInventory = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = "move";
  };

  // Win Logic Verification
  useEffect(() => {
    // Check if all slots are filled
    const filledCount = Object.values(slots).filter(Boolean).length;
    
    if (filledCount === TOTAL_SLOTS) {
      // Check sequence
      let correct = true;
      for (let i = 0; i < TOTAL_SLOTS; i++) {
        if (slots[i] !== WINNING_SEQUENCE[i]) {
          correct = false;
          break;
        }
      }
      if (correct) {
        setIsWon(true);
      }
    }
  }, [slots]);

  const resetGame = () => {
    setSlots({});
    setIsWon(false);
  };

  return (
    <div className="min-h-screen pb-12 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-amber-900/90 text-amber-100 py-6 border-b-4 border-yellow-600 shadow-xl sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl drop-shadow-lg tracking-wider">The Captain's Table</h1>
          <p className="text-yellow-500/80 mt-2 font-serif italic text-lg">"Solve the riddle of the seven seas..."</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl w-full flex-grow flex flex-col gap-12">
        
        {/* Top Section: Map & Slots Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Map (Static Reference) */}
          <div className="lg:col-span-5 w-full">
            <MapGrid />
          </div>

          {/* Right Column: The Puzzle Slots */}
          <div className="lg:col-span-7 w-full parchment-bg rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-amber-900/30">
            <h2 className="pirate-font text-2xl text-amber-900 mb-6 border-b border-amber-900/20 pb-2">
              The Sequence
            </h2>
            <p className="mb-6 text-amber-900/80">
              Drag items from your inventory into the slots below. Pay heed to the order, matey!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
                const itemId = slots[index];
                const item = INVENTORY_ITEMS.find(i => i.id === itemId) || null;
                return (
                  <Slot
                    key={index}
                    index={index}
                    item={item}
                    onDrop={handleDropOnSlot}
                    onClear={handleRemoveFromSlot}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: Inventory */}
        <div 
          className="parchment-bg rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-amber-900/30 w-full"
          onDragOver={handleDragOverInventory}
          onDrop={handleDropOnInventory}
        >
           <h2 className="pirate-font text-2xl text-amber-900 mb-6 border-b border-amber-900/20 pb-2 flex justify-between items-center">
            <span>Inventory</span>
            <span className="text-sm font-serif font-normal text-amber-800/60">
              (Drag items back here to remove from slots)
            </span>
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start min-h-[120px]">
            {inventoryItems.length === 0 ? (
              <div className="w-full text-center text-amber-900/40 italic py-8">
                Your satchel is empty. All items are placed.
              </div>
            ) : (
              inventoryItems.map(item => (
                <DraggableItem key={item.id} item={item} />
              ))
            )}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-amber-900/40 font-serif text-sm">
        <p>&copy; {new Date().getFullYear()} The Pirate Bay Enigma. All rights reserved.</p>
      </footer>

      {/* Victory Modal */}
      {isWon && <WinModal onClose={resetGame} />}
    </div>
  );
};

export default App;
