import create from 'zustand';
import { mqtt_v4, MQTTv4 } from 'u8-mqtt/esm/web/v4.mjs';

type MQTTStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface MQTTState {
  client: MQTTv4;
  status: MQTTStatus;
  connect: (url: string) => Promise<void>;
  publish: (options: { topic: string; payload: string }) => Promise<void>;
  subscribe: (topic: string) => Promise<void>;
}

export const useMQTTStore = create<MQTTState>()((set, get) => ({
  client: mqtt_v4(),
  status: 'disconnected',
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
    console.log(`trying to publish`);
    try {
      await client.publish(options);
      console.log('done');
    } catch (error) {
      console.log(error);
    }
  },
  subscribe: async (topic: string) => {
    const client = get().client;
    console.log(`trying to subscribe`);
    try {
      await client.subscribe_topic(topic, (pkt, params) => {
        console.log(`received messaged on topic ${params}:`, [pkt.utf8()]);
      });
      console.log(`%csubscribed to ${topic}`, 'color: green');
    } catch (error) {
      console.log(error);
    }
  },
}));
