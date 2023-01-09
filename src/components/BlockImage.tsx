import { useBlock } from '@/hooks/useBlock';
import { ImageBlock } from '@/stores/blockSlice';
import { cn } from '@/utils/classnames';

export function BlockImage({ block }: { block: ImageBlock }) {
  const { topicToPub, topicToSub, payload } = block;
  const { publish, lastMessage } = useBlock({ topicToPub, topicToSub });

  const canPublish = !!(topicToPub && payload);

  const onClick = () => {
    if (canPublish) publish(payload);
  };

  if (!lastMessage)
    return (
      <button
        className={cn('bg-gray-200 p-1 text-center w-full')}
        onClick={onClick}
        disabled={!canPublish}
      >
        <p>Waiting for image from &quot;{topicToSub}&quot;</p>
        {canPublish && (
          <p>
            Click to publish &quot;{payload}&quot; to &quot;{topicToPub}&quot;
          </p>
        )}
      </button>
    );

  return (
    <img
      className={cn(topicToPub && payload && 'cursor-pointer')}
      src={lastMessage}
      onClick={onClick}
    />
  );
}
