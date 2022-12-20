import { StateCreator } from 'zustand';
import { ClientSlice, LogType } from './clientSlice';
import { ConfigSlice } from './configSlice';

interface BaseBlock {
  id: number;
  component: 'button' | 'range' | 'logger' | 'switch';
}
export interface LoggerBlock extends BaseBlock {
  component: 'logger';
  types: LogType[];
}

export interface ButtonBlockPub extends BaseBlock {
  component: 'button';
  topicToPub: string;
  text: string;
  payload: string;
}
interface RangeBlockBase extends BaseBlock {
  component: 'range';
  name?: string;
  min?: number;
  max?: number;
}
export interface RangeBlockSub extends RangeBlockBase {
  topicToSub: string;
  topicToPub?: never;
}
export interface RangeBlockPub extends RangeBlockBase {
  topicToSub?: never;
  topicToPub: string;
}
export interface RangeBlockPubSub extends RangeBlockBase {
  topicToPub: string;
  topicToSub: string;
}

interface SwitchBlockBase extends BaseBlock {
  component: 'switch';
  name?: string;
}
export interface SwitchBlockSub extends SwitchBlockBase {
  topicToSub: string;
  topicToPub?: never;
}
export interface SwitchBlockPub extends SwitchBlockBase {
  topicToSub?: never;
  topicToPub: string;
}
export interface SwitchBlockPubSub extends SwitchBlockBase {
  topicToPub: string;
  topicToSub: string;
}

export type BlockProps =
  | ButtonBlockPub
  | LoggerBlock
  | RangeBlockPub
  | RangeBlockSub
  | RangeBlockPubSub
  | SwitchBlockPub
  | SwitchBlockSub
  | SwitchBlockPubSub;

export interface BlockGroup {
  name: string;
  id: number;
  blocks: BlockProps[];
}
export interface BlockSlice {
  blockGroups: BlockGroup[];
  create: (component: string) => Promise<void>;
  delete: (componentId: string) => Promise<void>;
  update: (componentId: string, config: object) => Promise<void>;
}

export const createBlockSlice: StateCreator<
  ClientSlice & BlockSlice & ConfigSlice,
  [],
  [],
  BlockSlice
> = (set, get) => ({
  blockGroups: [
    {
      name: 'Ranges',
      id: 1,
      blocks: [
        {
          id: 2,
          component: 'range',
          topicToPub: 'range',
          name: 'pub',
          min: 0,
          max: 100,
        },
        {
          id: 3,
          component: 'range',
          topicToSub: 'range',
          name: 'sub',
          min: 0,
          max: 100,
        },
        {
          id: 4,
          component: 'range',
          topicToPub: 'range',
          topicToSub: 'range',
          name: 'pub-sub',
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'Switches',
      id: 2,
      blocks: [
        {
          id: 6,
          component: 'switch',
          topicToPub: 'switch',
          name: 'pub',
        },
        {
          id: 7,
          component: 'switch',
          topicToSub: 'switch',
          name: 'sub',
        },
        {
          id: 8,
          component: 'switch',
          topicToPub: 'switch',
          topicToSub: 'switch',
          name: 'pub-sub',
        },
      ],
    },
    {
      name: 'Logger and Buttons',
      id: 3,
      blocks: [
        {
          id: 1,
          component: 'button',
          topicToPub: 'topic',
          text: 'text',
          payload: 'payload',
        },
        {
          id: 5,
          component: 'logger',
          types: ['error', 'connection', 'message', 'topic'],
        },
      ],
    },
  ],
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
