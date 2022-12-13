import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../hooks/useClient';

export function ConnectPage() {
  const navigate = useNavigate();
  const { connect, status } = useClient();
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
      className='h-screen mx-auto max-w-4xl flex flex-col items-center justify-center'
    >
      <input
        type='text'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isLoading}
        required
      />
      <button className='border rounded-full' disabled={isLoading}>
        connect
      </button>
    </form>
  );
}
