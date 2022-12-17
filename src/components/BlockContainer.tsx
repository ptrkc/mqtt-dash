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
  const pub =
    ('topicToPub' in block && block.topicToPub && `pub: ${block.topicToPub}`) ||
    '';
  const sub =
    ('topicToSub' in block && block.topicToSub && `sub: ${block.topicToSub}`) ||
    '';
  const topics = `${pub}${pub && sub ? ', ' : ''}${sub}`;

  return (
    <div className="p-2 bg-white rounded-xl shadow-md border">
      <BlockComponent block={block} />
      <span className="text-xs">{topics}</span>
    </div>
  );
}
