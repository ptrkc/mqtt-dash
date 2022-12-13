import { createContext, PropsWithChildren } from 'react';
import { mqtt_v4, MQTTv4 } from 'u8-mqtt/esm/web/v4.mjs';
import { useMQTT } from '../hooks/useMQTT';

export interface MQTTContextType {
  connect: (url: string) => Promise<void>;
  client: MQTTv4;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
}

export const MQTTContext = createContext<MQTTContextType>({
  connect: () => Promise.reject(new Error('MQTTContext not initialized')),
  client: mqtt_v4(),
  status: 'disconnected',
});

export function MQTTProvider({ children }: PropsWithChildren) {
  const { client, connect, status } = useMQTT();
  return (
    <MQTTContext.Provider value={{ client, connect, status }}>
      {children}
    </MQTTContext.Provider>
  );
}

export default MQTTProvider;
