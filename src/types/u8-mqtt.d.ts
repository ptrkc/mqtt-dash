declare module 'u8-mqtt/esm/web/v4.mjs' {
  export class MQTTv4 {
    with_websock: (url: string) => this;
    connect: (connectOptions: {
      client_id: string | string[];
      will: { topic: string; payload: string };
    }) => Promise<this>;
    publish: ({
      topic,
      payload,
    }: {
      topic: string;
      payload: string;
    }) => Promise<void>;
    subscribe_topic: (
      topic: string,
      callback: (
        pkt: { utf8: () => string; json: () => Record<string, string> },
        params: string
      ) => void
    ) => Promise<void>;
  }
  export const mqtt_v4 = () => new MQTTv4();
}
