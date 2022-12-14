import create from 'zustand';
import { ClientSlice, createClientSlice } from '@/stores/clientSlice';
import { createTileSlice, TileSlice } from '@/stores/tileSlice';

export const useBoundStore = create<ClientSlice & TileSlice>()((...a) => ({
  ...createClientSlice(...a),
  ...createTileSlice(...a),
}));
