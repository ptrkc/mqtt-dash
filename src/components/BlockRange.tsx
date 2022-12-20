import { useTopic } from '@/hooks/useTopic';
import {
  RangeBlockPub,
  RangeBlockPubSub,
  RangeBlockSub,
} from '@/stores/blockSlice';
import {
  ChangeEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';

type onTouchOrMouseEndType = MouseEventHandler<HTMLInputElement> &
  TouchEventHandler<HTMLInputElement>;

export function BlockRange({
  block: { topicToSub, topicToPub, name = 'Range', min = 0, max = 100 },
}: {
  block: RangeBlockPub | RangeBlockSub | RangeBlockPubSub;
}) {
  const { publish, lastMessage = '0' } = useTopic({ topicToPub, topicToSub });
  const [inputValue, setInputValue] = useState(lastMessage);

  useEffect(() => {
    setInputValue(lastMessage);
  }, [lastMessage]);

  const onTouchOrMouseEnd: onTouchOrMouseEndType = event => {
    if (publish) {
      const value = (event.target as HTMLInputElement).value;
      setInputValue(value);
      void publish(value);
    }
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value);
  };
  return (
    <div className="flex flex-col justify-start items-start">
      <span>{name}</span>
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
