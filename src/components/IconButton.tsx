import { ReactNode } from 'react';
import { cn } from '@/utils/classnames';

type IconButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: ReactNode };

export function IconButton({
  icon,
  onClick,
  className,
  ...rest
}: IconButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-8 h-8 p-[6px] shadow-lg flex justify-center items-center rounded-full font-bold text-white bg-indigo-500 hover:bg-indigo-600',
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
