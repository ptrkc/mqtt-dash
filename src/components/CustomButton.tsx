import { useBoundStore } from '@/hooks/useBoundStore';
import { Button } from './Button';

export function CustomButton({
  topic,
  payload,
  text,
}: {
  topic: string;
  payload: string;
  text: string;
}) {
  const { publish } = useBoundStore(state => ({
    publish: state.publish,
  }));

  const onClick = () => {
    void publish({ topic, payload });
  };
  return <Button onClick={onClick}>{text}</Button>;
}
