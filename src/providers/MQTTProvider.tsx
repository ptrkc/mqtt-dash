import { createContext, PropsWithChildren } from "react";
import mqtt_client from "u8-mqtt/esm/web/v4.mjs";
import { useMQTT } from "../hooks/useMQTT";

export interface MQTTContextType {
  connect: (url: string) => Promise<void>;
  client: null | typeof mqtt_client;
  status: "disconnected" | "connecting" | "connected" | "error";
}

export const MQTTContext = createContext<MQTTContextType>({
  connect: async () => {},
  client: null,
  status: "disconnected",
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
