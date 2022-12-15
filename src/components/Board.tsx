import { useBoundStore } from '@/hooks/useBoundStore';
import { Tile } from './Tile';

export function Board() {
  const { status, tiles } = useBoundStore(state => ({
    status: state.status,
    tiles: state.tiles,
  }));

  if (status === 'disconnected') {
    return <div>You are disconnected from the server.</div>;
  }

  return (
    <div className="flex gap-2 items-start justify-start flex-wrap">
      {tiles.map(tile => {
        return <Tile key={tile.id} tile={tile} />;
      })}
    </div>
  );
}
