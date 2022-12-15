import { StateCreator } from 'zustand';
import { ClientSlice, LogType } from './clientSlice';
import { ConfigSlice } from './configSlice';

interface BaseTile {
  id: number;
  component: 'button' | 'range' | 'logger';
}
export interface LoggerTile extends BaseTile {
  component: 'logger';
  types: LogType[];
}

export interface ButtonTilePub extends BaseTile {
  component: 'button';
  topicToPub: string;
  text: string;
  payload: string;
}
interface RangeTileBase extends BaseTile {
  component: 'range';
  name?: string;
  min?: number;
  max?: number;
}
export interface RangeTileSub extends RangeTileBase {
  topicToSub: string;
  topicToPub?: never;
}
export interface RangeTilePub extends RangeTileBase {
  topicToSub?: never;
  topicToPub: string;
}
export interface RangeTilePubSub extends RangeTileBase {
  topicToPub: string;
  topicToSub: string;
}

export type TileProps =
  | ButtonTilePub
  | LoggerTile
  | RangeTilePub
  | RangeTileSub
  | RangeTilePubSub;

export interface TileSlice {
  tiles: TileProps[];
  subbedTopics: string[];
  create: (component: string) => Promise<void>;
  delete: (componentId: string) => Promise<void>;
  update: (componentId: string, config: object) => Promise<void>;
}

export const createTileSlice: StateCreator<
  ClientSlice & TileSlice & ConfigSlice,
  [],
  [],
  TileSlice
> = (set, get) => ({
  tiles: [
    {
      id: 1,
      component: 'button',
      topicToPub: 'topic',
      text: 'text',
      payload: 'payload',
    },
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
    {
      id: 5,
      component: 'logger',
      types: ['error', 'connection', 'message', 'topic'],
    },
  ],
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
