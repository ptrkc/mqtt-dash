import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { SortableBlockGroupContainer } from '@/components/SortableBlockGroupContainer';
import { BlockGroupContainer } from '@/components/BlockGroupContainer';
import { useState } from 'react';
import { BlockGroup } from '@/stores/blockSlice';

const blockGroupsSelector = (state: BoundState) => ({
  blockGroups: state.blockGroups,
  setBlockGroups: state.setBlockGroups,
});

export function Board() {
  const [activeGroup, setActiveGroup] = useState<null | BlockGroup>(null);
  const { blockGroups, setBlockGroups } = useBoundStore(blockGroupsSelector);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blockGroups.findIndex(group => group.id === active.id);
      const newIndex = blockGroups.findIndex(group => group.id === over.id);
      const newArray = arrayMove(blockGroups, oldIndex, newIndex);
      setBlockGroups(newArray);
    }
    setActiveGroup(null);
  }
  function handleDragStart(event: DragStartEvent) {
    const group = blockGroups.find(group => group.id === event.active.id);
    if (group) setActiveGroup(group);
  }

  return (
    <div className="flex justify-center flex-wrap gap-2">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={rectSortingStrategy} items={blockGroups}>
          {blockGroups.map(group => (
            <SortableBlockGroupContainer key={group.id} group={group} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeGroup ? <BlockGroupContainer group={activeGroup} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
