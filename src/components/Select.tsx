import { cn } from '@/utils/classnames';

export function Select({
  children,
  className,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'bg-white box-border border-2 hover:border-2 active:border-2 transition-[border] border-gray-300 hover:border-gray-900 active:border-gray-900 px-2 hover:px-2 rounded-lg h-8',
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
}
