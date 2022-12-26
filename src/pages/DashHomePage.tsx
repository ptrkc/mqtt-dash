import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Board } from '@/components/Board';
import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { Switch } from '@/components/Switch';

const selector = (state: BoundState) => ({
  editMode: state.editMode,
  toggleEdit: state.toggleEdit,
  publish: state.publish,
  subscribe: state.subscribe,
});

function HomeTop() {
  const { publish, subscribe, editMode, toggleEdit } = useBoundStore(
    selector,
    shallow
  );
  const [payload, setPayload] = useState('');
  const [topic, setTopic] = useState('mqtt-dash-test');

  return (
    <div className="flex flex-col mx-auto justify-center items-center gap-3 p-2">
      <h1>MQTT-Dash</h1>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-col items-start gap-2">
          <label className="flex flex-col gap-2">
            <span>Topic to sub:</span>
            <Input value={topic} onChange={e => setTopic(e.target.value)} />
          </label>
          <Button onClick={() => void subscribe(topic)}>
            sub to &quot;{topic}&quot;
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="flex flex-col gap-2">
            <span>Payload to pub:</span>
            <Input value={payload} onChange={e => setPayload(e.target.value)} />
          </label>
          <Button onClick={() => void publish({ topic, payload })}>
            pub to &quot;{topic}&quot;
          </Button>
        </div>
        <label className="flex flex-col gap-2">
          Toggle Edit Mode:
          <Switch checked={editMode} onChange={toggleEdit} />
        </label>
      </div>
    </div>
  );
}

const statusSelector = (state: BoundState) => state.status;

export function DashHomePage() {
  const status = useBoundStore(statusSelector, shallow);

  if (status === 'disconnected') return <Navigate to={'/'} />;

  return (
    <div className="p-2">
      <HomeTop />
      <Board />
    </div>
  );
}
