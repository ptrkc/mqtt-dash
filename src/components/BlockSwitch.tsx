import { useEffect, useState } from 'react';
import { Switch } from '@/components/Switch';
import { useBlock } from '@/hooks/useBlock';
import {
  SwitchBlockPub,
  SwitchBlockPubSub,
  SwitchBlockSub,
} from '@/stores/blockSlice';

export function BlockSwitch({
  block: { topicToSub, topicToPub, localState, text, id, onValue, offValue },
}: {
  block: SwitchBlockPub | SwitchBlockSub | SwitchBlockPubSub;
}) {
  const { publish, lastMessage = localState ?? offValue } = useBlock({
    topicToPub,
    topicToSub,
    blockId: id,
  });
  const [isOn, setIsOn] = useState(lastMessage === onValue);

  useEffect(() => {
    if ([onValue, offValue].includes(lastMessage)) {
      setIsOn(lastMessage === onValue);
    }
  }, [lastMessage]);

  const onChange = () => {
    if (topicToPub) {
      setIsOn(!isOn);
      publish(isOn ? offValue : onValue);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span>{text}</span>
      <Switch checked={isOn} onChange={onChange} disabled={!topicToPub} />
    </div>
  );
}
