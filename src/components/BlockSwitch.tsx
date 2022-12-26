import { useEffect, useState } from 'react';
import { Switch } from '@/components/Switch';
import { useBlock } from '@/hooks/useBlock';
import {
  SwitchBlockPub,
  SwitchBlockPubSub,
  SwitchBlockSub,
} from '@/stores/blockSlice';

export function BlockSwitch({
  block: { topicToSub, topicToPub, localState, name = 'Switch', id },
}: {
  block: SwitchBlockPub | SwitchBlockSub | SwitchBlockPubSub;
}) {
  const { publish, lastMessage = localState ?? '0' } = useBlock({
    topicToPub,
    topicToSub,
    blockId: id,
  });
  const [isOn, setIsOn] = useState(lastMessage === '0' ? false : true);

  useEffect(() => {
    setIsOn(lastMessage === '1');
  }, [lastMessage]);

  const onChange = () => {
    if (topicToPub) {
      setIsOn(!isOn);
      publish(isOn ? '0' : '1');
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span>{name}</span>
      <Switch checked={isOn} onChange={onChange} disabled={!topicToPub} />
    </div>
  );
}
