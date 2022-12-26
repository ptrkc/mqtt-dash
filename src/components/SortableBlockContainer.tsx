import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BlockProps } from '@/stores/blockSlice';
import { BlockContainer } from './BlockContainer';

export function SortableBlockContainer({ block }: { block: BlockProps }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <BlockContainer
      block={block}
      isDragging={isDragging}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
    />
  );
}
