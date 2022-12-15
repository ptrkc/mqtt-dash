import { TileProps } from '@/stores/tileSlice';
import { CustomButton } from './CustomButton';
import { CustomRange } from './CustomRange';
import { CustomLogger } from '@/components/CustomLogger';

export function Tile({ tile }: { tile: TileProps }) {
  const { component } = tile;
  const pub =
    ('topicToPub' in tile && tile.topicToPub && `pub: ${tile.topicToPub}`) ||
    '';
  const sub =
    ('topicToSub' in tile && tile.topicToSub && `sub: ${tile.topicToSub}`) ||
    '';
  const topics = `${pub}${pub && sub ? ', ' : ''}${sub}`;

  return (
    <div className="p-2 bg-gray-100 rounded-md shadow-md border">
      {component === 'button' && <CustomButton tile={tile} />}
      {component === 'range' && <CustomRange tile={tile} />}
      {component === 'logger' && <CustomLogger tile={tile} />}
      <span className="text-xs">{topics}</span>
    </div>
  );
}
