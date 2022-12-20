import shallow from 'zustand/shallow';
import { useBoundStore } from './useBoundStore';
import { useCallback, useEffect } from 'react';

export const useTopic = ({
  topicToPub,
  topicToSub,
}: {
  topicToPub?: string;
  topicToSub?: string;
}) => {
  const {
    publish: originalPublish,
    lastMessage,
    subscribe,
  } = useBoundStore(
    useCallback(
      state => ({
        publish: state.publish,
        subscribe: state.subscribe,
        lastMessage: topicToSub && state.lastMessage[topicToSub],
      }),
      []
    ),
    shallow
  );

  useEffect(() => {
    const subscribeToTopic = async (topic: string) => {
      await subscribe(topic);
    };
    if (topicToSub) {
      subscribeToTopic(topicToSub).catch(error => console.log(error));
    }
  }, []);

  const publish = topicToPub
    ? (payload: string) => originalPublish({ topic: topicToPub, payload })
    : null;

  return { publish, lastMessage };
};
