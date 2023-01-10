import { StateCreator } from 'zustand';
import { ClientSlice, LogType } from '@/stores/clientSlice';
import { ConfigSlice } from '@/stores/configSlice';
import { generateId } from '@/utils/generateId';

export enum BlockComponent {
  Button = 'button',
  Range = 'range',
  Logger = 'logger',
  Switch = 'switch',
  Image = 'image',
}

interface BaseBlock {
  id: number;
  component: BlockComponent;
}
export interface LoggerBlock extends BaseBlock {
  component: BlockComponent.Logger;
  types: LogType[];
}

export interface ImageBlock extends BaseBlock {
  component: BlockComponent.Image;
  topicToSub: string;
  topicToPub?: string;
  payload?: string;
}

export interface ButtonBlockPub extends BaseBlock {
  component: BlockComponent.Button;
  topicToPub: string;
  text: string;
  payload: string;
}
interface RangeBlockBase extends BaseBlock {
  component: BlockComponent.Range;
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
  component: BlockComponent.Switch;
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
          component: BlockComponent.Range,
          topicToPub: BlockComponent.Range,
          text: 'pub',
          min: 0,
          max: 100,
          localState: '100',
        },
        {
          id: 2,
          component: BlockComponent.Range,
          topicToSub: BlockComponent.Range,
          text: 'sub',
          min: 0,
          max: 100,
        },
        {
          id: 3,
          component: BlockComponent.Range,
          topicToPub: BlockComponent.Range,
          topicToSub: BlockComponent.Range,
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
          component: BlockComponent.Switch,
          topicToPub: BlockComponent.Switch,
          text: 'pub',
          localState: '0',
          onValue: '1',
          offValue: '0',
        },
        {
          id: 5,
          component: BlockComponent.Switch,
          topicToSub: BlockComponent.Switch,
          text: 'sub',
          onValue: '1',
          offValue: '0',
        },
        {
          id: 6,
          component: BlockComponent.Switch,
          topicToPub: BlockComponent.Switch,
          topicToSub: BlockComponent.Switch,
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
          component: BlockComponent.Button,
          topicToPub: 'topic',
          text: 'text',
          payload: 'payload',
        },
        {
          id: 8,
          component: BlockComponent.Logger,
          types: ['error', 'connection', 'message', 'topic'],
        },
      ],
    },
    {
      name: '4th',
      id: 4,
      blocks: [
        {
          component: BlockComponent.Switch,
          text: 'YES/NO',
          topicToPub: 'YESNO',
          topicToSub: 'YESNO',
          onValue: 'YES',
          offValue: 'NO',
          id: 9,
        },
        {
          component: BlockComponent.Button,
          text: 'YES',
          payload: 'YES',
          topicToPub: 'YESNO',
          id: 10,
        },
        {
          component: BlockComponent.Button,
          text: 'NO',
          payload: 'NO',
          topicToPub: 'YESNO',
          id: 11,
        },
        { id: 12, component: BlockComponent.Image, topicToSub: 'image' },
        {
          id: 13,
          component: BlockComponent.Image,
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
    group?.blocks.push({ ...newBlock, id: generateId() });
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
