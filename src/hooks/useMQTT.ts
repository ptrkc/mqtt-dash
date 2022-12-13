import { useState } from 'react';
import { mqtt_v4 } from 'u8-mqtt/esm/web/v4.mjs';
import { MQTTContextType } from '../providers/MQTTProvider';

export const useMQTT = () => {
  const [client] = useState(mqtt_v4());
  const [status, setStatus] =
    useState<MQTTContextType['status']>('disconnected');

  const connect = async (url: string) => {
    setStatus('connecting');
    console.log(`trying to connect to ${url}`);
    client.with_websock(url);
    try {
      await client.connect({
        client_id: ['mqtt-dash--', '--user'],
        will: {
          topic: 'mqtt-dash-test',
          payload: 'gone!',
        },
      });
      console.log('connected');
      setStatus('connected');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  return { client, connect, status };
};
