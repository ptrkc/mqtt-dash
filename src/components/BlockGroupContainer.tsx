import { BlockGroup, BlockProps } from '@/stores/blockSlice';
import { BlockContainer } from './BlockContainer';
import { forwardRef, Ref, useState } from 'react';
import { Handle } from './Handle';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/utils/classnames';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { SortableBlockContainer } from './SortableBlockContainer';

const selector = (state: BoundState) => ({
  setGroupBlocks: state.setGroupBlocks,
  editMode: state.editMode,
});
// eslint-disable-next-line react/display-name
export const BlockGroupContainer = forwardRef(
  (
    {
      group,
      listeners,
      attributes,
      style,
      isSorting,
      isDragging,
    }: {
      group: BlockGroup;
      style?: React.CSSProperties;
      attributes?: DraggableAttributes;
      listeners?: SyntheticListenerMap;
      isSorting?: boolean;
      isDragging?: boolean;
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const [activeBlock, setActiveBlock] = useState<null | BlockProps>(null);
    const { setGroupBlocks, editMode } = useBoundStore(selector);

    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = group.blocks.findIndex(
          block => block.id === active.id
        );
        const newIndex = group.blocks.findIndex(block => block.id === over.id);
        const newArray = arrayMove(group.blocks, oldIndex, newIndex);
        setGroupBlocks(group.id, newArray);
      }
      setActiveBlock(null);
    }
    function handleDragStart(event: DragStartEvent) {
      const block = group.blocks.find(block => block.id === event.active.id);
      if (block) setActiveBlock(block);
    }

    return (
      <div
        className={cn(
          'flex flex-col bg-white rounded-xl shadow-md border w-full max-w-sm overflow-hidden',
          isSorting && 'h-60',
          isDragging && 'opacity-40'
        )}
        style={style}
        ref={ref}
      >
        <div className="flex justify-between bg-gray-100 px-2 py-1">
          <h2>{group.name}</h2>
          {editMode && <Handle attributes={attributes} listeners={listeners} />}
        </div>
        <div className="p-1 pb-2">
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={group.blocks}
            >
              {group.blocks.map(block => {
                return <SortableBlockContainer key={block.id} block={block} />;
              })}
            </SortableContext>
            <DragOverlay>
              {activeBlock ? <BlockContainer block={activeBlock} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    );
  }
);
