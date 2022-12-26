import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BlockGroup } from '@/stores/blockSlice';
import { BlockGroupContainer } from '@/components/BlockGroupContainer';

export function SortableBlockGroupContainer({ group }: { group: BlockGroup }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <BlockGroupContainer
      group={group}
      isDragging={isDragging}
      isSorting={isSorting}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
    />
  );
}
