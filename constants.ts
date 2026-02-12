import { GameItem } from "./types";

/**
 * ==========================================
 * ASSET MANAGEMENT
 * ==========================================
 * Images are expected to be in the same directory as the index.html
 */

// SECTION 1: MAP IMAGES
export const MAP_ASSETS = [
  "./map-1.png",
  "map-2.png",
  "map-3.png",
  "map-4.png",
];

// SECTION 2: TREASURE ITEMS (Inventory)
export const INVENTORY_ITEMS: GameItem[] = [
  { id: "item-1", name: "Golden Compass", src: "tr1.png" },
  { id: "item-2", name: "Silver Dagger", src: "tr2.png" },
  { id: "item-3", name: "Ruby Ring", src: "tr3.png" },
  { id: "item-4", name: "Ancient Key", src: "tr4.png" },
  { id: "item-5", name: "Pearl Necklace", src: "tr5.png" },
  { id: "item-6", name: "Spyglass", src: "tr6.png" },
  { id: "item-7", name: "Doubloon", src: "tr7.png" },
  { id: "item-8", name: "Skull Chalice", src: "tr8.png" },
  { id: "item-9", name: "Sextant", src: "tr9.png" },
  { id: "item-10", name: "Hook", src: "tr10.png" },
  { id: "item-11", name: "Message in Bottle", src: "tr11.png" },
];

// WINNING IMAGE
export const VICTORY_IMAGE = "https://picsum.photos/id/200/600/400"; // Placeholder for victory

// GAME LOGIC
export const TOTAL_SLOTS = 5;

// The Secret Sequence (IDs must match INVENTORY_ITEMS)
export const WINNING_SEQUENCE = [
  "item-3", 
  "item-7", 
  "item-1", 
  "item-11", 
  "item-5"
];