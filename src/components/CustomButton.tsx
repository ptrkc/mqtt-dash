import { Button } from './Button';
import { useTopic } from '@/hooks/useTopic';
import { ButtonTilePub } from '@/stores/tileSlice';

export function CustomButton({ tile }: { tile: ButtonTilePub }) {
  const { topicToPub, payload, text } = tile;
  const { publish } = useTopic({ topicToPub });

  const onClick = () => {
    void publish?.(payload);
  };
  return <Button onClick={onClick}>{text}</Button>;
}
