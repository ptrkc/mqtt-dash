import { StateCreator } from 'zustand';
import { mqtt_v4, MQTTv4 } from 'u8-mqtt/esm/web/v4.mjs';
import { TileSlice } from './tileSlice';

type MQTTStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface ClientSlice {
  client: MQTTv4;
  status: MQTTStatus;
  lastMessage: Record<string, string>;
  connect: (url: string) => Promise<void>;
  publish: (options: { topic: string; payload: string }) => Promise<void>;
  subscribe: (topic: string) => Promise<void>;
  unsubscribe: (topic: string) => Promise<void>;
}

export const createClientSlice: StateCreator<
  ClientSlice & TileSlice,
  [],
  [],
  ClientSlice
> = (set, get) => ({
  client: mqtt_v4(),
  status: 'disconnected',
  lastMessage: {},
  connect: async (url: string) => {
    const client = get().client;
    console.log(`trying to connect to ${url}`);
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
      console.log('connected');
      set({ status: 'connected' });
    } catch (error) {
      console.log(error);
      set({ status: 'error' });
    }
  },
  publish: async (options: { topic: string; payload: string }) => {
    const client = get().client;
    try {
      await client.publish(options);
      console.log(`%cpublished on ${options.topic}`, 'color: green');
    } catch (error) {
      console.log(error);
    }
  },
  subscribe: async (topic: string) => {
    const client = get().client;
    try {
      await client.subscribe_topic(topic, pkt => {
        console.log(
          `%creceived messaged on topic ${topic}: ${pkt.utf8()}`,
          'color: green'
        );
        const message = pkt.utf8();
        const lastMessage = get().lastMessage;
        set({ lastMessage: { ...lastMessage, [topic]: message } });
      });
      console.log(`%csubscribed to ${topic}`, 'color: green');
    } catch (error) {
      console.log(error);
    }
  },
  unsubscribe: async (topic: string) => {
    const client = get().client;
    try {
      await client.unsubscribe([topic]);
      console.log(`%cunsubscribed to ${topic}`, 'color: red');
    } catch (error) {
      console.log(error);
    }
  },
});
