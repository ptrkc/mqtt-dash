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
      activeGroupId,
      listeners,
      attributes,
      style,
    }: {
      group: BlockGroup;
      activeGroupId?: number;
      style?: React.CSSProperties;
      attributes?: DraggableAttributes;
      listeners?: SyntheticListenerMap;
    },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn(
          'relative flex flex-col bg-white rounded-xl shadow-md border w-full max-w-sm overflow-scroll',
          activeGroupId !== undefined && 'h-64',
          activeGroupId === group.id && 'opacity-40'
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
        <div
          className={cn(
            'absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-black/30',
            activeGroupId !== undefined ? 'block' : 'hidden'
          )}
        />
      </div>
    );
  }
);
