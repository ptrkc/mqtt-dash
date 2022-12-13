import { useContext } from 'react';
import { MQTTContext } from '../providers/MQTTProvider';

export const useClient = () => {
  const { connect, client, status } = useContext(MQTTContext);
  return { connect, client, status };
};
