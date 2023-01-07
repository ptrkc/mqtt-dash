import { ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { Spinner } from '@/components/Icons';
import { forwardRef } from 'react';

const colors = {
  default:
    'text-white focus:ring-indigo-600 bg-indigo-500 disabled:hover:bg-indigo-500 hover:bg-indigo-600',
  red: 'text-white focus:ring-red-600 bg-red-500 disabled:hover:bg-red-500 hover:bg-red-600',
  // yellow: 'text-black focus:ring-yellow-600 bg-yellow-500 hover:bg-yellow-600',
};

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode;
  isLoading?: boolean;
  color?: keyof typeof colors;
};

export const Button = forwardRef<HTMLButtonElement, ButtonType>(
  (
    {
      children,
      onClick,
      className,
      icon,
      isLoading = false,
      disabled,
      color = 'default',
      ...rest
    },
    ref
  ) => {
    const iconToShow = isLoading ? <Spinner /> : icon;
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          colors[color],
          'flex justify-center items-center rounded-xl font-semibold px-4 py-1 shadow-lg active:shadow-none disabled:shadow-none active:scale-95 disabled:active:scale-100 focus:ring-2 focus:ring-offset-2 transition-[filter]',
          !isLoading &&
            'disabled:bg-gray-400/80 disabled:hover:bg-gray-400/80 disabled:cursor-not-allowed',
          iconToShow ? 'pl-2 pr-4' : 'px-6',
          className
        )}
        disabled={disabled ?? isLoading}
        {...rest}
      >
        {iconToShow && <span className="w-5 h-5 ml-2 mr-2">{iconToShow}</span>}
        <span>{children}</span>
      </button>
    );
  }
);
Button.displayName = 'Button';
