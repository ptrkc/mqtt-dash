import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMQTTStore } from '@/hooks/useMQTTStore';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function DashHomePage() {
  const { publish, subscribe, status } = useMQTTStore(state => ({
    publish: state.publish,
    subscribe: state.subscribe,
    status: state.status,
  }));
  const [payload, setPayload] = useState('');
  const [topic, setTopic] = useState('mqtt-dash-test');

  if (status === 'disconnected') return <Navigate to={'/'} />;

  return (
    <div className="h-screen flex flex-col mx-auto justify-center items-center gap-3">
      <h1>hello mqtt wold</h1>
      <div className="flex gap-2">
        <label className="flex flex-col gap-2">
          <span>Topic to sub:</span>
          <Input value={topic} onChange={e => setTopic(e.target.value)} />
        </label>
        <label className="flex flex-col gap-2">
          <span>Payload to pub:</span>
          <Input value={payload} onChange={e => setPayload(e.target.value)} />
        </label>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => void subscribe(topic)}>
          sub to &quot;{topic}&quot;
        </Button>
        <Button onClick={() => void publish({ topic, payload })}>
          pub to &quot;{topic}&quot;
        </Button>
      </div>
    </div>
  );
}
