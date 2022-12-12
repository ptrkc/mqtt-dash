import { MQTTContext } from "../contexts/MQTTContext";
import { useMQTT } from "../hooks/useMQTT";
import { PropsWithChildren } from "react";

export function MQTTProvider({ children }: PropsWithChildren) {
  const { client, connect } = useMQTT();
  return (
    <MQTTContext.Provider value={{ client, connect }}>
      {children}
    </MQTTContext.Provider>
  );
}

export default MQTTProvider;
