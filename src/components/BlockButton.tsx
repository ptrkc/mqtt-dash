import { Button } from '@/components/Button';
import { useTopic } from '@/hooks/useTopic';
import { ButtonBlockPub } from '@/stores/blockSlice';

export function BlockButton({ block }: { block: ButtonBlockPub }) {
  const { topicToPub, payload, text } = block;
  const { publish } = useTopic({ topicToPub });

  const onClick = () => {
    void publish?.(payload);
  };
  return <Button onClick={onClick}>{text}</Button>;
}
