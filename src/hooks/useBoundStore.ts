import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ClientSlice, createClientSlice } from '@/stores/clientSlice';
import { createBlockSlice, BlockSlice } from '@/stores/blockSlice';
import { ConfigSlice, createConfigSlice } from '@/stores/configSlice';

export type BoundState = ClientSlice & BlockSlice & ConfigSlice;
export const useBoundStore = create<BoundState>()(
  persist(
    (...a) => ({
      ...createClientSlice(...a),
      ...createBlockSlice(...a),
      ...createConfigSlice(...a),
    }),
    {
      name: 'configStorage',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['client', 'status', 'subbedTopics'].includes(key)
          )
        ),
    }
  )
);
