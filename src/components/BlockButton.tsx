import { Button } from '@/components/Button';
import { useBlock } from '@/hooks/useBlock';
import { ButtonBlockPub } from '@/stores/blockSlice';

export function BlockButton({ block }: { block: ButtonBlockPub }) {
  const { topicToPub, payload, text } = block;
  const { publish } = useBlock({ topicToPub });

  const onClick = () => publish(payload);

  return <Button onClick={onClick}>{text}</Button>;
}
