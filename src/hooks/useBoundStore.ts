import create from 'zustand';
import { ClientSlice, createClientSlice } from '@/stores/clientSlice';
import { createTileSlice, TileSlice } from '@/stores/tileSlice';

export type BoundState = ClientSlice & TileSlice;
export const useBoundStore = create<BoundState>()((...a) => ({
  ...createClientSlice(...a),
  ...createTileSlice(...a),
}));
