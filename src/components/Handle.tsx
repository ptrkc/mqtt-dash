/* eslint-disable react/jsx-props-no-spreading */
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { EditorButton } from '@/components/EditorButton';
import { MoveIcon } from '@/components/Icons';

export function Handle({
  attributes,
  listeners,
}: {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}) {
  return (
    <EditorButton
      {...attributes}
      {...listeners}
      className="cursor-move touch-none"
      icon={<MoveIcon />}
    />
  );
}
