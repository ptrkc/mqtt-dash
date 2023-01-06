import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useBoundStore } from '@/hooks/useBoundStore';

export function ConnectPage() {
  const navigate = useNavigate();
  const { connect, status, brokerUrl, setConfig, autoConnect } = useBoundStore(
    state => ({
      connect: state.connect,
      status: state.status,
      brokerUrl: state.brokerUrl,
      setConfig: state.setConfig,
      autoConnect: state.autoConnect,
    })
  );
  const [url, setUrl] = useState(brokerUrl); //ws://192.168.0.3:9001
  const [autoConnectCheck, setAutoConnectCheck] = useState(autoConnect);

  useEffect(() => {
    if (autoConnect && brokerUrl) {
      connect(url);
      navigate('/home');
    }
  }, []);

  useEffect(() => {
    if (status === 'connected') {
      setConfig({ brokerUrl: url, autoConnect: autoConnectCheck });
      return navigate('/home');
    }
  }, [status]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    connect(url);
  };

  const isLoading = status === 'connecting';
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      className=" h-[80vh] mx-auto max-w-4xl flex flex-col items-center justify-center gap-3"
    >
      <label className="flex flex-col gap-2">
        <span>MQTT WebSocket Server:</span>
        <Input
          placeholder="wss://test.mosquitto.org:8081"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      {status === 'error' && (
        <span className="text-red-600">
          Couldn&apos;t connect to the server, check the URL.
        </span>
      )}
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={autoConnectCheck}
          onChange={event => setAutoConnectCheck(event.target.checked)}
        />
        <span>Keep connected</span>
      </label>
      <Button isLoading={isLoading}>Connect</Button>
    </form>
  );
}
