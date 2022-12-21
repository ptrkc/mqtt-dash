import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BlockGroup } from '@/stores/blockSlice';
import { BlockGroupContainer } from './BlockGroupContainer';

export function SortableBlockGroupContainer({
  group,
  activeGroupId,
}: {
  group: BlockGroup;
  activeGroupId?: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: group.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <BlockGroupContainer
      activeGroupId={activeGroupId}
      group={group}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
    />
  );
}
