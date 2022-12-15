import { useMemo } from 'react';
import shallow from 'zustand/shallow';
import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { LoggerTile } from '@/stores/tileSlice';
import { cn } from '@/utils/classnames';
import { UIEventHandler, useEffect, useRef, useState } from 'react';
import { Button } from './Button';

const logsSelector = (state: BoundState) => state.logs;

export function CustomLogger({ tile }: { tile: LoggerTile }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const lastScrollTop = useRef(0);
  const containerRef = useRef<null | HTMLUListElement>(null);
  const unfilteredLogs = useBoundStore(logsSelector, shallow);
  const logs = useMemo(() => {
    return unfilteredLogs.filter(log => tile.types.includes(log.type));
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

  return (
    <div className="border relative w-full">
      <ul
        onScroll={onScroll}
        ref={containerRef}
        className="bg-white h-64 overflow-auto text-xs p-1"
      >
        {logs.map(log => (
          <li key={log.id}>
            {new Date(log.date).toLocaleString()} {log.message}
          </li>
        ))}
      </ul>
      <Button
        className={cn(
          'absolute bottom-2 -translate-x-1/2 left-1/2 bg-white',
          autoScroll && 'hidden'
        )}
        onClick={() => {
          scrollToBottom();
          setAutoScroll(true);
        }}
      >
        Back to bottom
      </Button>
    </div>
  );
}
