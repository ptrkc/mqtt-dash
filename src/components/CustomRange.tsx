import { useBoundStore } from '@/hooks/useBoundStore';
import {
  RangeTilePub,
  RangeTilePubSub,
  RangeTileSub,
} from '@/stores/tileSlice';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

export function CustomRange({
  tile: { topicToSub, topicToPub, name = 'Range', min = 0, max = 100 },
}: {
  tile: RangeTilePub | RangeTileSub | RangeTilePubSub;
}) {
  const [inputValue, setInputValue] = useState('0');
  const { publish } = useBoundStore(state => ({
    publish: state.publish,
  }));

  const onMouseUp: MouseEventHandler<HTMLInputElement> = event => {
    const value = (event.target as HTMLInputElement).value;
    setInputValue(value);
    if (topicToPub) {
      void publish({ topic: topicToPub, payload: value });
    }
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <label>
        {name}
        <input
          onMouseUp={onMouseUp}
          value={inputValue}
          onChange={onChange}
          type="range"
          min={min}
          max={max}
        />
      </label>
    </div>
  );
}
