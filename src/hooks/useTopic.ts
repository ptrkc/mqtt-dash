import shallow from 'zustand/shallow';
import { useBoundStore } from './useBoundStore';
import { useEffect } from 'react';

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
    state => ({
      publish: state.publish,
      subscribe: state.subscribe,
      lastMessage: topicToSub && state.lastMessage[topicToSub],
    }),
    shallow
  );

  useEffect(() => {
    const subscribeToTopic = async (topic: string) => {
      await subscribe(topic);
    };
    if (topicToPub) {
      subscribeToTopic(topicToPub).catch(error => console.log(error));
    }
  }, []);

  const publish = topicToPub
    ? (payload: string) => originalPublish({ topic: topicToPub, payload })
    : null;

  return { publish, lastMessage };
};
