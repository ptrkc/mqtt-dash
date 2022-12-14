import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from 'react';
import { cn } from '@/utils/classnames';

type EditorButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: ReactNode;
};

export const EditorButton = forwardRef<HTMLButtonElement, EditorButtonProps>(
  ({ icon, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
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
);

EditorButton.displayName = 'EditorButton';
