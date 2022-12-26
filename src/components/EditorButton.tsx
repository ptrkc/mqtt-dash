import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { cn } from '@/utils/classnames';

export function EditorButton({
  icon,
  className,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: ReactNode;
}) {
  return (
    <button
      className={cn(
        'w-8 h-8 p-1 flex justify-center items-center cursor-pointer bg-gray-300 sm:bg-inherit hover:bg-gray-300 rounded-md transition-colors',
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
