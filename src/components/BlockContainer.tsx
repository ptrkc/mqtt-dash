import { BlockProps } from '@/stores/blockSlice';
import { BlockButton } from '@/components/BlockButton';
import { BlockRange } from '@/components/BlockRange';
import { BlockLogger } from '@/components/BlockLogger';
import { BlockSwitch } from '@/components/BlockSwitch';
import { cn } from '@/utils/classnames';
import { forwardRef, Ref } from 'react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Handle } from './Handle';
import { useBoundStore, BoundState } from '@/hooks/useBoundStore';

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
    default:
      return null;
  }
}

const editModeSelector = (state: BoundState) => state.editMode;

// eslint-disable-next-line react/display-name
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
          {editMode && <Handle attributes={attributes} listeners={listeners} />}
        </div>
      </div>
    );
  }
);
