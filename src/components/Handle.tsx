import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { MoveIcon } from './Icons';

export function Handle({
  attributes,
  listeners,
}: {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}) {
  return (
    <button
      className="w-8 h-8 p-[6px] flex justify-center items-center cursor-grab hover:bg-gray-300 rounded-md transition-colors touch-none"
      {...attributes}
      {...listeners}
    >
      <MoveIcon />
    </button>
  );
}
