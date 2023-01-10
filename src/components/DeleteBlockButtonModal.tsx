import { DeleteModal } from '@/components/DeleteModal';
import { useBoundStore, BoundState } from '@/hooks/useBoundStore';

const selector = (state: BoundState) => state.deleteBlock;

export function DeleteBlockButtonModal({ blockId }: { blockId: number }) {
  const deleteBlock = useBoundStore(selector);
  return (
    <DeleteModal
      deleteFunction={() => deleteBlock(blockId)}
      description="This action will permanently delete this Block"
      deleteText="Delete Block"
    />
  );
}
