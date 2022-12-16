import { useEffect, useState } from 'react';
import { Switch } from '@/components/Switch';
import { useTopic } from '@/hooks/useTopic';
import {
  SwitchBlockPub,
  SwitchBlockPubSub,
  SwitchBlockSub,
} from '@/stores/blockSlice';

export function BlockSwitch({
  block: { topicToSub, topicToPub, name = 'Switch' },
}: {
  block: SwitchBlockPub | SwitchBlockSub | SwitchBlockPubSub;
}) {
  const { publish, lastMessage = '0' } = useTopic({ topicToPub, topicToSub });
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    setIsOn(lastMessage === '1');
  }, [lastMessage]);

  const onChange = () => {
    if (publish) {
      setIsOn(!isOn);
      void publish(isOn ? '0' : '1');
    }
  };

  return (
    <div className="flex flex-col justify-start items-start">
      <span>{name}</span>
      <Switch
        type={'checkbox'}
        checked={isOn}
        onChange={onChange}
        disabled={!topicToPub}
      />
    </div>
  );
}
