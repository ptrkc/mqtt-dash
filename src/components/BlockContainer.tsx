import { BlockProps } from '@/stores/blockSlice';
import { BlockButton } from '@/components/BlockButton';
import { BlockRange } from '@/components/BlockRange';
import { BlockLogger } from '@/components/BlockLogger';
import { BlockSwitch } from '@/components/BlockSwitch';

function BlockComponent({ block }: { block: BlockProps }) {
  switch (block.component) {
    case 'button':
      return <BlockButton block={block} />;
    case 'range':
      return <BlockRange block={block} />;
    case 'logger':
      return <BlockLogger block={block} />;
    case 'switch':
      return <BlockSwitch block={block} />;
    default:
      return null;
  }
}

export function BlockContainer({ block }: { block: BlockProps }) {
  return (
    <div className="flex flex-col p-2">
      <BlockComponent block={block} />
    </div>
  );
}
