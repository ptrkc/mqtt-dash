import { useBoundStore } from '@/hooks/useBoundStore';
import { ButtonTilePub } from '@/stores/tileSlice';
import { Button } from './Button';

export function CustomButton({ tile }: { tile: ButtonTilePub }) {
  const { topic, payload, text } = tile;
  const { publish } = useBoundStore(state => ({
    publish: state.publish,
  }));

  const onClick = () => {
    void publish({ topic, payload });
  };
  return <Button onClick={onClick}>{text}</Button>;
}
