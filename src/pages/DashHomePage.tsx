import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useClient } from '../hooks/useClient';

export function DashHomePage() {
  const { client, status } = useClient();
  const [message, setMessage] = useState('');
  const [customTopic, setCustomTopic] = useState('mqtt-dash-test');

  if (status === 'disconnected') return <Navigate to={'/'} />;

  const publish = async (topic: string, payload: string) => {
    await client.publish({ topic, payload });
  };
  const subToTest = async (topic: string) => {
    await client.subscribe_topic(topic, (pkt, params) => {
      console.log(`received messaged on topic ${params}:`, [pkt.utf8()]);
    });
    console.log(`subscribed to ${topic}`);
  };

  return (
    <div>
      <h1>hello mqtt wold</h1>
      <input
        value={customTopic}
        onChange={(e) => setCustomTopic(e.target.value)}
      />
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => void subToTest(customTopic)}>
        sub to &quot;{customTopic}&quot;
      </button>
      <button onClick={() => void publish(customTopic, message)}>
        pub to &quot;{customTopic}&quot;
      </button>
    </div>
  );
}
