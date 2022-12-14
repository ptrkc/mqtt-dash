import { CustomButton } from './CustomButton';

const components = {
  button: CustomButton,
};

interface TileProps {
  component: 'button';
  topic: string;
  text: string;
  payload: string;
}

export function Tile(props: TileProps) {
  const { component, ...rest } = props;
  const Component = components[component];

  return (
    <div>
      <Component {...rest} />
    </div>
  );
}
