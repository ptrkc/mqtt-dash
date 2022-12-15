import { StateCreator } from 'zustand';
import { TileSlice } from './tileSlice';
import { ClientSlice } from './clientSlice';

export interface ConfigSlice {
  autoConnect: boolean;
  brokerUrl: string;
  setConfig: (config: Partial<ConfigSlice>) => void;
}

export const createConfigSlice: StateCreator<
  ClientSlice & TileSlice & ConfigSlice,
  [],
  [],
  ConfigSlice
> = (set, get) => ({
  autoConnect: false,
  brokerUrl: '',
  setConfig: (config: Partial<ConfigSlice>) => {
    console.log(config);
    set(config);
  },
});
