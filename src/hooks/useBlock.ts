import shallow from 'zustand/shallow';
import { useBoundStore } from './useBoundStore';
import { useCallback, useEffect } from 'react';

export const useBlock = ({
  topicToPub,
  topicToSub,
  blockId,
}: {
  topicToPub?: string;
  topicToSub?: string;
  blockId?: number;
}) => {
  const {
    publish: originalPublish,
    lastMessage,
    subscribe,
    updateLocalState,
  } = useBoundStore(
    useCallback(
      state => ({
        publish: state.publish,
        subscribe: state.subscribe,
        lastMessage: topicToSub && state.lastMessage[topicToSub],
        updateLocalState: state.updateLocalState,
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

  const publish = (payload: string) => {
    if (topicToPub) {
      if (topicToSub) {
        void originalPublish({ topic: topicToPub, payload });
      } else if (!topicToSub && blockId !== undefined) {
        updateLocalState(blockId, payload);
        void originalPublish({ topic: topicToPub, payload });
      }
    }
  };
  return { publish, lastMessage };
};
