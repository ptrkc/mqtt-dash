import { TileProps } from '@/stores/tileSlice';
import { CustomButton } from './CustomButton';
import { CustomRange } from './CustomRange';
import { CustomLogger } from '@/components/CustomLogger';

export function Tile({ tile }: { tile: TileProps }) {
  const { component } = tile;

  return (
    <div className="p-2 rounded-md shadow-md">
      {component === 'button' && <CustomButton tile={tile} />}
      {component === 'range' && <CustomRange tile={tile} />}
      {component === 'logger' && <CustomLogger tile={tile} />}
    </div>
  );
}
