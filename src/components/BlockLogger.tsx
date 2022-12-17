import { UIEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { LoggerBlock } from '@/stores/blockSlice';
import { cn } from '@/utils/classnames';
import { IconButton } from '@/components/IconButton';
import { ArrowDownIcon } from '@/components/Icons';

const logsSelector = (state: BoundState) => state.logs;

export function BlockLogger({ block }: { block: LoggerBlock }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const lastScrollTop = useRef(0);
  const containerRef = useRef<null | HTMLUListElement>(null);
  const unfilteredLogs = useBoundStore(logsSelector, shallow);
  const logs = useMemo(() => {
    return unfilteredLogs.filter(log => block.types.includes(log.type));
  }, [unfilteredLogs]);

  const scrollToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
    });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [logs]);

  const onScroll: UIEventHandler<HTMLUListElement> = event => {
    const { scrollTop } = event.target as HTMLDivElement;
    const isGoingUp = scrollTop < lastScrollTop.current;
    if (autoScroll && isGoingUp) {
      setAutoScroll(false);
    }
    lastScrollTop.current = scrollTop;
  };

  const onClick = () => {
    scrollToBottom();
    setAutoScroll(true);
  };

  return (
    <div className="border relative w-80">
      <ul
        onScroll={onScroll}
        ref={containerRef}
        className="bg-white h-40 overflow-auto text-xs p-1"
      >
        {logs.map(log => (
          <li key={log.id}>
            {new Date(log.date).toLocaleString()} {log.message}
          </li>
        ))}
      </ul>
      <IconButton
        icon={<ArrowDownIcon />}
        className={cn('absolute bottom-2 right-4', autoScroll && 'hidden')}
        onClick={onClick}
      />
    </div>
  );
}
