import { StateCreator } from 'zustand';
import { mqtt_v4, MQTTv4 } from 'u8-mqtt/esm/web/v4.mjs';
import { BlockSlice } from './blockSlice';
import { generateId } from '@/utils/generateId';
import { ConfigSlice } from './configSlice';

type MQTTStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
export type LogType = 'topic' | 'message' | 'connection' | 'error';

export interface ClientSlice {
  client: MQTTv4;
  status: MQTTStatus;
  lastMessage: Record<string, string>;
  logs: {
    id: number;
    date: number;
    type: LogType;
    topic?: string;
    message: string;
  }[];
  log: (log: { type: LogType; topic?: string; message: string }) => void;
  connect: (url: string) => Promise<void>;
  publish: (options: { topic: string; payload: string }) => Promise<void>;
  subscribe: (topic: string) => Promise<void>;
  unsubscribe: (topic: string) => Promise<void>;
}

export const createClientSlice: StateCreator<
  ClientSlice & BlockSlice & ConfigSlice,
  [],
  [],
  ClientSlice
> = (set, get) => ({
  client: mqtt_v4(),
  status: 'disconnected',
  lastMessage: {},
  logs: [],
  log: (log: { type: LogType; topic?: string; message: string }) => {
    const logs = get().logs;
    set({ logs: [...logs, { id: generateId(), date: Date.now(), ...log }] });
  },
  connect: async (url: string) => {
    const log = get().log;
    const client = get().client;
    log({ type: 'connection', message: `trying to connect to ${url}` });
    client.with_websock(url);
    try {
      set({ status: 'connecting' });
      await client.connect({
        client_id: ['mqtt-dash--', '--user'],
        will: {
          topic: 'mqtt-dash-test',
          payload: 'gone!',
        },
      });
      log({ type: 'connection', message: `connected to ${url}` });
      set({ status: 'connected' });
    } catch (error) {
      log({ type: 'error', message: JSON.stringify(error) });
      set({ status: 'error' });
    }
  },
  publish: async (options: { topic: string; payload: string }) => {
    const log = get().log;
    const client = get().client;
    try {
      await client.publish(options);
      log({
        type: 'message',
        topic: options.topic,
        message: `published: ${options.payload}`,
      });
    } catch (error) {
      log({ type: 'error', message: JSON.stringify(error) });
    }
  },
  subscribe: async (topic: string) => {
    const log = get().log;
    const client = get().client;
    try {
      await client.subscribe_topic(topic, pkt => {
        log({
          type: 'message',
          topic: topic,
          message: `received: ${pkt.utf8()}`,
        });

        const message = pkt.utf8();
        const lastMessage = get().lastMessage;
        set({ lastMessage: { ...lastMessage, [topic]: message } });
      });
      log({ type: 'topic', topic, message: `subscribed to: ${topic}` });
    } catch (error) {
      log({ type: 'error', message: JSON.stringify(error) });
    }
  },
  unsubscribe: async (topic: string) => {
    const log = get().log;
    const client = get().client;
    try {
      await client.unsubscribe([topic]);
      log({
        type: 'topic',
        topic: topic,
        message: `unsubscribed from: ${topic}`,
      });
    } catch (error) {
      log({ type: 'error', message: JSON.stringify(error) });
    }
  },
});
