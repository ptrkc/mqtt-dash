import { cn } from '@/utils/classnames';
import { InputHTMLAttributes } from 'react';

export function Switch(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={cn(
        'w-14 h-7 rounded-full inline-block relative overflow-hidden',
        props.disabled ? ' cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <input type="checkbox" className="hidden peer" {...props} />
      <span className="w-full absolute left-0 right-0 top-0 bottom-0 bg-gray-300 peer-checked:bg-green-400 peer-disabled:bg-gray-300 peer-disabled:peer-checked:bg-green-300" />
      <span className="h-7 w-7 bg-white rounded-full inline-block border border-gray-700 transition-transform translate-x-0 peer-disabled:bg-gray-200 peer-checked:translate-x-7 absolute" />
    </label>
  );
}
