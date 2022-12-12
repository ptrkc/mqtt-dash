import { useEffect, useState } from "react";
import mqtt_client from "u8-mqtt/esm/web/v4.mjs";
import { MQTTContextType } from "../providers/MQTTProvider";

export const useMQTT = () => {
  const [client, setClient] = useState(null);
  const [status, setStatus] =
    useState<MQTTContextType["status"]>("disconnected");

  useEffect(() => {
    if (client !== null) setStatus("connected");
  }, [client]);

  const connect = async (url: string) => {
    setStatus("connecting");
    console.log(`trying to connect to ${url}`);
    const newClient = mqtt_client().with_websock(url);
    try {
      await newClient.connect({
        client_id: ["mqtt-dash--", "--user"],
        will: {
          topic: "mqtt-dash-test",
          payload: "gone!",
        },
      });
      console.log("connected");
      setClient(newClient);
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return { client, connect, status };
};
