import { useState } from "react";
import mqtt_client from "u8-mqtt/esm/web/v4.mjs";

async function on_live(mqttClient: typeof mqtt_client) {
  await mqttClient.connect({
    client_id: ["my-mqtt--", "--demo"],
    will: {
      topic: "u8-mqtt-demo/bye",
      payload: "gone!",
    },
  });

  mqttClient.publish({
    topic: "u8-mqtt-demo/topic/node-side-fun-test",
    payload: "awesome from both web and node",
  });

  mqttClient.send("hello", "hello world");
}

export const useMQTT = () => {
  const [client, setClient] = useState(null);

  const connect = async (url: string) => {
    try {
      const newClient = await mqtt_client({ on_live }).with_websock(
        `ws://${url}`
      );
      if (newClient) setClient(newClient);
      return true;
    } catch (error) {
      setClient(null);
      console.log(error);
      return false;
    }
  };

  return { client, connect };
};
