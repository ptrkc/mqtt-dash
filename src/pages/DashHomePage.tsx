import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useClient } from "../hooks/useClient";

export function DashHomePage() {
  const { client } = useClient();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [customTopic, setCustomTopic] = useState("");

  if (!client) return <Navigate to={"/"} />;

  const publish = async (topic: string, payload: string) => {
    await client.publish({ topic, payload });
  };
  const subToTest = async (topic: string) => {
    await client.subscribe_topic(topic, (pkt, params, ctx) => {
      console.log({ topic, params });
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
