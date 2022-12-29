import { generateId } from '@/utils/generateId';
import { StateCreator } from 'zustand';
import { ClientSlice, LogType } from './clientSlice';
import { ConfigSlice } from './configSlice';

export enum BlockComponent {
  button = 'button',
  range = 'range',
  logger = 'logger',
  switch = 'switch',
}

interface BaseBlock {
  id: number;
  component: keyof typeof BlockComponent;
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
export interface RangeBlockPub extends RangeBlockBase {
  topicToSub?: never;
  topicToPub: string;
  localState: string;
}
export interface RangeBlockSub extends RangeBlockBase {
  topicToSub: string;
  topicToPub?: never;
  localState?: never;
}
export interface RangeBlockPubSub extends RangeBlockBase {
  topicToPub: string;
  topicToSub: string;
  localState?: never;
}

interface SwitchBlockBase extends BaseBlock {
  component: 'switch';
  name?: string;
}
export interface SwitchBlockPub extends SwitchBlockBase {
  topicToSub?: never;
  topicToPub: string;
  localState: string;
}
export interface SwitchBlockSub extends SwitchBlockBase {
  topicToSub: string;
  topicToPub?: never;
  localState?: never;
}
export interface SwitchBlockPubSub extends SwitchBlockBase {
  topicToPub: string;
  topicToSub: string;
  localState?: never;
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
  setBlockGroups: (blockGroups: BlockGroup[]) => void;
  setGroupBlocks: (groupId: number, blocks: BlockProps[]) => void;
  create: (groupId: number, newBlock: BlockProps) => void;
  delete: (componentId: string) => Promise<void>;
  updateLocalState: (blockId: number, value: string) => void;
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
          id: 1,
          component: 'range',
          topicToPub: 'range',
          name: 'pub',
          min: 0,
          max: 100,
          localState: '100',
        },
        {
          id: 2,
          component: 'range',
          topicToSub: 'range',
          name: 'sub',
          min: 0,
          max: 100,
        },
        {
          id: 3,
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
          id: 4,
          component: 'switch',
          topicToPub: 'switch',
          name: 'pub',
          localState: '0',
        },
        {
          id: 5,
          component: 'switch',
          topicToSub: 'switch',
          name: 'sub',
        },
        {
          id: 6,
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
          id: 7,
          component: 'button',
          topicToPub: 'topic',
          text: 'text',
          payload: 'payload',
        },
        {
          id: 8,
          component: 'logger',
          types: ['error', 'connection', 'message', 'topic'],
        },
      ],
    },
    {
      name: '4th',
      id: 4,
      blocks: [],
    },
  ],
  setBlockGroups: (blockGroups: BlockGroup[]) => {
    return set({ blockGroups });
  },
  setGroupBlocks: (groupId: number, blocks: BlockProps[]) => {
    const blockGroups = get().blockGroups;
    const groupIndex = blockGroups.findIndex(group => group.id === groupId);
    blockGroups[groupIndex].blocks = blocks;
    return set({ blockGroups });
  },
  create: (groupId: number, newBlock: BlockProps) => {
    const blockGroups = get().blockGroups;
    const group = blockGroups.find(group => group.id === groupId);
    group?.blocks.push({ ...newBlock, id: generateId() });
    return set({ blockGroups });
  },
  delete: async (componentId: string) => {
    console.log(componentId);
  },
  updateLocalState: (blockId: number, value: string) => {
    const groups = get().blockGroups;
    for (const { blocks } of groups) {
      const foundBlock = blocks.find(block => block.id === blockId);
      if (foundBlock && 'localState' in foundBlock) {
        foundBlock.localState = value;
        return set({ blockGroups: groups });
      }
    }
  },
});
