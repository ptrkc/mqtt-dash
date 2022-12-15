import { useTopic } from '@/hooks/useTopic';
import {
  RangeTilePub,
  RangeTilePubSub,
  RangeTileSub,
} from '@/stores/tileSlice';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';

export function CustomRange({
  tile: { topicToSub, topicToPub, name = 'Range', min = 0, max = 100 },
}: {
  tile: RangeTilePub | RangeTileSub | RangeTilePubSub;
}) {
  const { publish, lastMessage = '0' } = useTopic({ topicToPub, topicToSub });
  const [inputValue, setInputValue] = useState(lastMessage);

  useEffect(() => {
    setInputValue(lastMessage);
  }, [lastMessage]);

  const onMouseUp: MouseEventHandler<HTMLInputElement> = event => {
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
    <label className="flex flex-col justify-start items-start">
      {name}
      <input
        onMouseUp={onMouseUp}
        value={inputValue}
        onChange={onChange}
        type="range"
        min={min}
        max={max}
        disabled={!topicToPub}
      />
    </label>
  );
}
