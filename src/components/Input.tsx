import { cn } from '@/utils/classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'w-72 box-border border hover:border-2 active:border-2 border-gray-400 hover:border-gray-900 active:border-gray-900 px-[4px] hover:px-[3px] rounded-md h-8',
        className
      )}
      {...rest}
    />
  );
}
