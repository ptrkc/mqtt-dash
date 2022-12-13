import { IconButton } from '@/components/IconButton';
import { MinusIcon, PlusIcon } from '@/components/Icons';
import { ChangeEventHandler } from 'react';

export function IntegerInput({
  value,
  onChange,
  buttonsFunction,
  min,
  max,
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  buttonsFunction: (newValue: number) => void;
}) {
  const minDisabled = min !== undefined ? value <= min : false;
  const maxDisabled = max !== undefined ? value >= max : false;
  return (
    <span className="inline-flex rounded-full border-[1px] border-blue-500">
      <IconButton
        className="bg-blue-500 rounded-r-none w-10 disabled:bg-blue-300 transition-[background]"
        onClick={() => {
          buttonsFunction(value - 1);
        }}
        icon={<MinusIcon />}
        disabled={minDisabled}
      />
      <input
        className="text-center border-0 rounded-none w-10 px-0"
        type="number"
        step={1}
        min={min}
        value={String(value)}
        onChange={onChange}
      />
      <IconButton
        className="bg-blue-500 rounded-l-none w-10 disabled:bg-blue-300 transition-[background]"
        onClick={() => {
          buttonsFunction(value + 1);
        }}
        icon={<PlusIcon />}
        disabled={maxDisabled}
      />
    </span>
  );
}
