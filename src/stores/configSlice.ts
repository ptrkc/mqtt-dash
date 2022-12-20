import { StateCreator } from 'zustand';
import { BlockSlice } from './blockSlice';
import { ClientSlice } from './clientSlice';

export interface ConfigSlice {
  autoConnect: boolean;
  brokerUrl: string;
  setConfig: (config: Partial<ConfigSlice>) => void;
}

export const createConfigSlice: StateCreator<
  ClientSlice & BlockSlice & ConfigSlice,
  [],
  [],
  ConfigSlice
> = (set, get) => ({
  autoConnect: false,
  brokerUrl: '',
  setConfig: (config: Partial<ConfigSlice>) => {
    set(config);
  },
});
