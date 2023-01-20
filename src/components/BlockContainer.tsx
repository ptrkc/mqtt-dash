import { forwardRef, Ref } from 'react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { BlockButton } from '@/components/BlockButton';
import { BlockImage } from '@/components/BlockImage';
import { BlockLogger } from '@/components/BlockLogger';
import { BlockRange } from '@/components/BlockRange';
import { BlockSwitch } from '@/components/BlockSwitch';
import { DeleteBlockButtonModal } from '@/components/DeleteBlockButtonModal';
import { Handle } from '@/components/Handle';
import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { BlockProps } from '@/stores/blockSlice';
import { cn } from '@/utils/classnames';
import { EditBlockButton } from './EditBlockButton';

function BlockComponent({ block }: { block: BlockProps }) {
  switch (block.component) {
    case 'button':
      return <BlockButton block={block} />;
    case 'range':
      return <BlockRange block={block} />;
    case 'logger':
      return <BlockLogger block={block} />;
    case 'switch':
      return <BlockSwitch block={block} />;
    case 'image':
      return <BlockImage block={block} />;
    default:
      return null;
  }
}

const editModeSelector = (state: BoundState) => state.editMode;

export const BlockContainer = forwardRef(
  (
    {
      block,
      listeners,
      attributes,
      style,
      isDragging,
    }: {
      block: BlockProps;
      style?: React.CSSProperties;
      attributes?: DraggableAttributes;
      listeners?: SyntheticListenerMap;
      isDragging?: boolean;
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const editMode = useBoundStore(editModeSelector);
    return (
      <div
        className={cn('flex flex-col p-2', isDragging && 'opacity-40')}
        style={style}
        ref={ref}
      >
        <div className="flex items-center gap-2">
          <div className="w-full">
            <BlockComponent block={block} />
          </div>
          {editMode && (
            <div className="flex gap-2">
              <EditBlockButton blockId={block.id} />
              <DeleteBlockButtonModal blockId={block.id} />
              <Handle attributes={attributes} listeners={listeners} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

BlockContainer.displayName = 'BlockContainer';
