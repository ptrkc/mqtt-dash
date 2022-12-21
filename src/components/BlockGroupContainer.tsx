import { BlockGroup } from '@/stores/blockSlice';
import { BlockContainer } from './BlockContainer';
import { forwardRef, Ref } from 'react';
import { Handle } from './Handle';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/utils/classnames';

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
          <Handle attributes={attributes} listeners={listeners} />
        </div>
        <div className="p-1 pb-2">
          {group.blocks.map(block => {
            return <BlockContainer key={block.id} block={block} />;
          })}
        </div>
      </div>
    );
  }
);
