import { StateCreator } from 'zustand';
import { ClientSlice } from './clientSlice';

export interface TileSlice {
  tiles: object[];
  subbedTopics: string[];
  create: (component: string) => Promise<void>;
  delete: (componentId: string) => Promise<void>;
  update: (componentId: string, config: object) => Promise<void>;
}

export const createTileSlice: StateCreator<
  TileSlice & ClientSlice,
  [],
  [],
  TileSlice
> = (set, get) => ({
  tiles: [],
  subbedTopics: [],
  create: async (url: string) => {
    console.log(url);
  },
  delete: async (componentId: string) => {
    console.log(componentId);
  },
  update: async (topic: string) => {
    console.log(topic);
  },
});
