import { StateCreator } from 'zustand';
import { BlockSlice } from '@/stores/blockSlice';
import { ClientSlice } from '@/stores/clientSlice';

export interface ConfigSlice {
  autoConnect: boolean;
  editMode: boolean;
  brokerUrl: string;
  toggleEdit: () => void;
  setConfig: (config: Partial<ConfigSlice>) => void;
}

export const createConfigSlice: StateCreator<
  ClientSlice & BlockSlice & ConfigSlice,
  [],
  [],
  ConfigSlice
> = (set, get) => ({
  autoConnect: false,
  editMode: false,
  brokerUrl: '',
  toggleEdit: () => set({ editMode: !get().editMode }),
  setConfig: (config: Partial<ConfigSlice>) => set(config),
});
