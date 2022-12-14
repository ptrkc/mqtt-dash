import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useBoundStore } from './useBoundStore';

export const useTopic = ({
  topicToPub,
  topicToSub,
}: {
  topicToPub?: string;
  topicToSub?: string;
}) => {
  const {
    unsubscribe,
    subscribe,
    publish: originalPublish,
    lastMessage,
  } = useBoundStore(
    state => ({
      unsubscribe: state.unsubscribe,
      subscribe: state.subscribe,
      publish: state.publish,
      lastMessage: topicToSub && state.lastMessage[topicToSub],
    }),
    shallow
  );
  useEffect(() => {
    if (topicToSub) {
      void subscribe(topicToSub);
    }

    return () => {
      topicToSub && unsubscribe(topicToSub);
    };
  }, []);

  const publish = topicToPub
    ? (payload: string) => originalPublish({ topic: topicToPub, payload })
    : null;

  return { publish, lastMessage };
};
