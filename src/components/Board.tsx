import { useBoundStore } from '@/hooks/useBoundStore';
import { Tile } from './Tile';

export function Board() {
  const { status } = useBoundStore(state => ({ status: state.status }));

  if (status === 'disconnected') {
    return <div>You are disconnected from the server.</div>;
  }

  return (
    <div className="bg-gray-100">
      connected
      <Tile component="button" topic="lol" text="lol" payload={'lol'} />
    </div>
  );
}
