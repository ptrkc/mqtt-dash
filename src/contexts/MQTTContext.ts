import { createContext } from "react";
import mqtt_client from "u8-mqtt/esm/web/v4.mjs";

interface ContextType {
  connect: (url: string) => Promise<boolean>;
  client: null | typeof mqtt_client;
}

export const MQTTContext = createContext<ContextType>({
  connect: async () => false,
  client: null,
});
