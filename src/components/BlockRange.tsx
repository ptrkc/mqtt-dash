import {
  ChangeEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';
import { useBlock } from '@/hooks/useBlock';
import {
  RangeBlockPub,
  RangeBlockPubSub,
  RangeBlockSub,
} from '@/stores/blockSlice';

type onTouchOrMouseEndType = MouseEventHandler<HTMLInputElement> &
  TouchEventHandler<HTMLInputElement>;

export function BlockRange({
  block: { topicToSub, topicToPub, text, min = 0, max = 100, localState, id },
}: {
  block: RangeBlockPub | RangeBlockSub | RangeBlockPubSub;
}) {
  const { publish, lastMessage = localState ?? '0' } = useBlock({
    topicToPub,
    topicToSub,
    blockId: id,
  });
  const [inputValue, setInputValue] = useState(lastMessage);

  useEffect(() => {
    setInputValue(lastMessage);
  }, [lastMessage]);

  const onTouchOrMouseEnd: onTouchOrMouseEndType = event => {
    if (topicToPub) {
      const value = (event.target as HTMLInputElement).value;
      setInputValue(value);
      publish(value);
    }
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value);
  };
  return (
    <div className="flex flex-col justify-start items-start">
      <span>{text}</span>
      <input
        onMouseUp={onTouchOrMouseEnd}
        onTouchEnd={onTouchOrMouseEnd}
        value={inputValue}
        onChange={onChange}
        type="range"
        min={min}
        max={max}
        disabled={!topicToPub}
        className="disabled:cursor-not-allowed w-full"
      />
    </div>
  );
}
