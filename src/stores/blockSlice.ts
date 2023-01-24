import { StateCreator } from 'zustand';
import { ClientSlice, LogType } from '@/stores/clientSlice';
import { ConfigSlice } from '@/stores/configSlice';
import { generateId } from '@/utils/generateId';

export type BlockComponent = 'button' | 'range' | 'logger' | 'switch' | 'image';
export const BlockComponentOptions = [
  'button',
  'range',
  'logger',
  'switch',
  'image',
];
interface BaseBlock {
  id: number;
  component: BlockComponent;
}
export interface LoggerBlock extends BaseBlock {
  component: 'logger';
  types: LogType[];
}

export interface ImageBlock extends BaseBlock {
  component: 'image';
  topicToSub: string;
  topicToPub?: string;
  payload?: string;
}

export interface ButtonBlockPub extends BaseBlock {
  component: 'button';
  topicToPub: string;
  text: string;
  payload: string;
}
interface RangeBlockBase extends BaseBlock {
  component: 'range';
  text: string;
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
  text?: string;
  onValue: string;
  offValue: string;
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
  | SwitchBlockPubSub
  | ImageBlock;

export interface BlockGroup {
  name: string;
  id: number;
  blocks: BlockProps[];
}
export interface BlockSlice {
  blockGroups: BlockGroup[];
  addGroup: (groupName: string) => void;
  deleteGroup: (groupId: number) => void;
  setBlockGroups: (blockGroups: BlockGroup[]) => void;
  setGroupBlocks: (groupId: number, blocks: BlockProps[]) => void;
  addBlock: (groupId: number, newBlock: Omit<BlockProps, 'id'>) => void;
  deleteBlock: (blockId: number) => void;
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
          text: 'pub',
          min: 0,
          max: 100,
          localState: '100',
        },
        {
          id: 2,
          component: 'range',
          topicToSub: 'range',
          text: 'sub',
          min: 0,
          max: 100,
        },
        {
          id: 3,
          component: 'range',
          topicToPub: 'range',
          topicToSub: 'range',
          text: 'pub-sub',
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
          text: 'pub',
          localState: '0',
          onValue: '1',
          offValue: '0',
        },
        {
          id: 5,
          component: 'switch',
          topicToSub: 'switch',
          text: 'sub',
          onValue: '1',
          offValue: '0',
        },
        {
          id: 6,
          component: 'switch',
          topicToPub: 'switch',
          topicToSub: 'switch',
          text: 'pub-sub',
          onValue: '1',
          offValue: '0',
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
      blocks: [
        {
          component: 'switch',
          text: 'YES/NO',
          topicToPub: 'YESNO',
          topicToSub: 'YESNO',
          onValue: 'YES',
          offValue: 'NO',
          id: 9,
        },
        {
          component: 'button',
          text: 'YES',
          payload: 'YES',
          topicToPub: 'YESNO',
          id: 10,
        },
        {
          component: 'button',
          text: 'NO',
          payload: 'NO',
          topicToPub: 'YESNO',
          id: 11,
        },
        { id: 12, component: 'image', topicToSub: 'image' },
        {
          id: 13,
          component: 'image',
          topicToSub: 'image',
          topicToPub: 'image',
          payload:
            'https://pointlesseffect.files.wordpress.com/2012/12/image39.jpg',
        },
      ],
    },
  ],
  addGroup: (groupName: string) => {
    return set({
      blockGroups: [
        ...get().blockGroups,
        { id: generateId(), name: groupName, blocks: [] },
      ],
    });
  },
  deleteGroup: (groupId: number) => {
    return set({
      blockGroups: get().blockGroups.filter(group => group.id !== groupId),
    });
  },
  setBlockGroups: (blockGroups: BlockGroup[]) => {
    return set({ blockGroups });
  },
  setGroupBlocks: (groupId: number, blocks: BlockProps[]) => {
    const blockGroups = get().blockGroups;
    const groupIndex = blockGroups.findIndex(group => group.id === groupId);
    blockGroups[groupIndex].blocks = blocks;
    return set({ blockGroups });
  },
  addBlock: (groupId: number, newBlock: Omit<BlockProps, 'id'>) => {
    const blockGroups = get().blockGroups;
    const group = blockGroups.find(group => group.id === groupId);
    group?.blocks.push({ ...newBlock, id: generateId() } as BlockProps);
    return set({ blockGroups });
  },
  deleteBlock: (blockId: number) => {
    const blockGroups = get().blockGroups;
    const filteredBlockGroups = blockGroups.map(group => {
      const newBlocks = group.blocks.filter(block => block.id !== blockId);
      return { ...group, blocks: newBlocks };
    });

    return set({ blockGroups: filteredBlockGroups });
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
