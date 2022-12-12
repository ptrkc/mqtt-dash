import { useState } from "react";
import { client } from "../services/ws";

export function DashHomePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [customTopic, setCustomTopic] = useState("");

  const publish = async (topic: string, payload: string) => {
    await client.publish({ topic, payload });
  };
  const subToTest = async (topicToSub: string) => {
    await client.subscribe_topic(topicToSub, (pkt, params, ctx) => {
      console.log(`received messaged on topic ${params}:`, [pkt.utf8()]);
    });
  };

  return (
    <div>
      <h1>hello mqtt wold</h1>
      <input
        value={customTopic}
        onChange={(e) => setCustomTopic(e.target.value)}
      />
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => subToTest(customTopic)}>
        sub to "{customTopic}"
      </button>
      <button onClick={() => publish(customTopic, message)}>
        pub to "{customTopic}"
      </button>
    </div>
  );
}
