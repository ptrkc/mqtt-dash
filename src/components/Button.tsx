import { ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { Spinner } from '@/components/Icons';

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode;
  isLoading?: boolean;
};

export function Button({
  children,
  onClick,
  className,
  icon,
  isLoading = false,
  disabled,
  ...rest
}: ButtonType) {
  const iconToShow = isLoading ? <Spinner /> : icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex justify-center items-center rounded-xl font-semibold px-4 py-1 shadow-lg text-white active:shadow-none active:scale-95 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 bg-indigo-500 transition-[filter] hover:bg-indigo-600',
        !isLoading &&
          'disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed',
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
