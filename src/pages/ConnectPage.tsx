import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useMQTTStore } from '@/hooks/useMQTTStore';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ConnectPage() {
  const navigate = useNavigate();
  const { connect, status } = useMQTTStore(state => ({
    connect: state.connect,
    status: state.status,
  }));
  const [url, setUrl] = useState('wss://test.mosquitto.org:8081');

  console.log(status);
  useEffect(() => {
    if (status === 'connected') return navigate('/home');
  }, [status]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await connect(url);
  };

  const isLoading = status === 'connecting';
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      className="h-screen mx-auto max-w-4xl flex flex-col items-center justify-center gap-3"
    >
      <label className="flex flex-col gap-2">
        <span>MQTT WebSocket Server:</span>
        <Input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      <Button disabled={isLoading}>connect</Button>
    </form>
  );
}
