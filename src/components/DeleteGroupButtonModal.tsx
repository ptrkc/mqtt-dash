import { DeleteModal } from '@/components/DeleteModal';
import { useBoundStore, BoundState } from '@/hooks/useBoundStore';

const selector = (state: BoundState) => state.deleteGroup;

export function DeleteGroupButtonModal({ groupId }: { groupId: number }) {
  const deleteGroup = useBoundStore(selector);
  return (
    <DeleteModal
      deleteFunction={() => deleteGroup(groupId)}
      description="This action will permanently delete this Block"
      deleteText="Delete Group"
    />
  );
}
