import { Button } from '@/components/Button';
import { ButtonBlockPub } from '@/stores/blockSlice';
import { useBlock } from '@/hooks/useBlock';

export function BlockButton({ block }: { block: ButtonBlockPub }) {
  const { topicToPub, payload, text } = block;
  const { publish } = useBlock({ topicToPub });

  const onClick = () => publish(payload);

  return <Button onClick={onClick}>{text}</Button>;
}
