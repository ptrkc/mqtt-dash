import { StateCreator } from 'zustand';
import { mqtt_v4, MQTTv4 } from 'u8-mqtt/esm/web/v4.min.js';
import { BlockSlice } from '@/stores/blockSlice';
import { ConfigSlice } from '@/stores/configSlice';
import { generateId } from '@/utils/generateId';

type MQTTStatus = 'connected' | 'connecting' | 'disconnected' | 'error';
export type LogType = 'topic' | 'message' | 'connection' | 'error';

type SubscriptionStatus =
  | 'subscribing'
  | 'subscribed'
  | 'unsubscribed'
  | 'error';

export interface ClientSlice {
  client: MQTTv4;
  status: MQTTStatus;
  lastMessage: Record<string, string>;
  subbedTopics: Record<string, SubscriptionStatus>;
  logs: {
    id: number;
    date: number;
    type: LogType;
    topic?: string;
    message: string;
  }[];
  log: (log: { type: LogType; topic?: string; message: string }) => void;
  connect: (url: string) => Promise<void>;
  disconnect: () => void;
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
  subbedTopics: {},
  logs: [],
  log: (log: { type: LogType; topic?: string; message: string }) => {
    const logs = get().logs.slice(-999);
    set({ logs: [...logs, { id: generateId(), date: Date.now(), ...log }] });
  },
  connect: async (url: string) => {
    const log = get().log;
    const client = get().client;
    if (['connecting', 'connected'].includes(get().status)) return;

    set({ status: 'connecting' });
    client.with_websock(url);
    client.with_autoreconnect();
    client.on_disconnect = (currentClient: MQTTv4, intentional: boolean) => {
      log({ type: 'connection', message: `Disconnected from ${url}` });
      if (!intentional) {
        log({ type: 'connection', message: `Connecting to ${url}` });
        currentClient.on_reconnect();
        log({ type: 'connection', message: `Connected to ${url}` });
      } else {
        set({ status: 'disconnected' });
      }
    };
    log({ type: 'connection', message: `Connecting to ${url}` });
    await client.connect({
      client_id: ['mqtt-dash--', '--user'],
      will: {
        topic: 'mqtt-dash-test',
        payload: 'gone!',
      },
    });
    log({ type: 'connection', message: `Connected to ${url}` });
    set({ status: 'connected' });
  },
  disconnect: () => {
    const client = get().client;
    client.disconnect();
    set({ client: mqtt_v4(), subbedTopics: {} });
  },
  publish: async (options: { topic: string; payload: string }) => {
    const log = get().log;
    const client = get().client;
    try {
      await client.publish(options);
      log({
        type: 'message',
        topic: options.topic,
        message: `Published: ${options.payload}`,
      });
    } catch (error) {
      log({ type: 'error', message: JSON.stringify(error) });
    }
  },
  subscribe: async (topic: string) => {
    const log = get().log;
    const client = get().client;
    const subbedTopics = get().subbedTopics;
    if (['subscribed', 'subscribing'].includes(subbedTopics[topic])) return;

    log({ type: 'topic', topic, message: `Subscribing to: ${topic}` });
    set({ subbedTopics: { ...subbedTopics, [topic]: 'subscribing' } });
    try {
      await client.subscribe_topic(topic, pkt => {
        log({
          type: 'message',
          topic: topic,
          message: `Received: ${pkt.utf8()}`,
        });
        set({ lastMessage: { ...get().lastMessage, [topic]: pkt.utf8() } });
      });
      set({ subbedTopics: { ...get().subbedTopics, [topic]: 'subscribed' } });
      log({ type: 'topic', topic, message: `Subscribed to: ${topic}` });
    } catch (error) {
      set({ subbedTopics: { ...get().subbedTopics, [topic]: 'error' } });
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
        message: `Unsubscribed from: ${topic}`,
      });
    } catch (error) {
      log({ type: 'error', message: JSON.stringify(error) });
    }
  },
});
