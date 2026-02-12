export interface GameItem {
  id: string;
  name: string;
  src: string;
}

export type SlotState = {
  [key: number]: string | null; // slotIndex -> itemId
};

export interface DragItemPayload {
  id: string;
  source: 'inventory' | 'slot';
  sourceIndex?: number;
}
