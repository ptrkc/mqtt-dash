declare module 'u8-mqtt/esm/web/v4.min.js' {
  export class MQTTv4 {
    with_websock: (url: string) => this;
    with_autoreconnect: (milliseconds?: number) => void;
    on_reconnect: () => void;
    with_live: (on_live: () => Promise<void>) => void;
    on_disconnect: (client: MQTTv4, intentional: boolean) => void;
    connect: (connectOptions: {
      client_id: string | string[];
      will: { topic: string; payload: string };
    }) => Promise<this>;
    disconnect: () => void;
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
    unsubscribe: (topic: string[]) => Promise<void>;
  }
  export function mqtt_v4(): MQTTv4;
  export default mqtt_v4;
}
