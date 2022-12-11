import mqtt_client from "u8-mqtt/esm/web/v4.mjs";

export const client = mqtt_client({ on_live }).with_websock(
  "ws://127.0.0.1:9001"
);

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
