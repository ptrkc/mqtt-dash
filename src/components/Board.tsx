import { useBoundStore } from '@/hooks/useBoundStore';
import { BlockContainer } from '@/components/BlockContainer';

export function Board() {
  const { status, blocks } = useBoundStore(state => ({
    status: state.status,
    blocks: state.blocks,
  }));

  if (status === 'disconnected') {
    return <div>You are disconnected from the server.</div>;
  }

  return (
    <div className="flex gap-2 items-start justify-start flex-wrap">
      {blocks.map(block => {
        return <BlockContainer key={block.id} block={block} />;
      })}
    </div>
  );
}
