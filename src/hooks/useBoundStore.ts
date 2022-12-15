import create from 'zustand';
import { ClientSlice, createClientSlice } from '@/stores/clientSlice';
import { createTileSlice, TileSlice } from '@/stores/tileSlice';
import { ConfigSlice, createConfigSlice } from '@/stores/configSlice';
import { persist } from 'zustand/middleware';

export type BoundState = ClientSlice & TileSlice & ConfigSlice;
export const useBoundStore = create<BoundState>()(
  persist(
    (...a) => ({
      ...createClientSlice(...a),
      ...createTileSlice(...a),
      ...createConfigSlice(...a),
    }),
    {
      name: 'configStorage',
      getStorage: () => localStorage,
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['client', 'status', 'subbedTopics'].includes(key)
          )
        ),
    }
  )
);
