import { useContext } from "react";
import { MQTTContext } from "../contexts/MQTTContext";

export const useClient = () => {
  const { connect, client } = useContext(MQTTContext);
  return { connect, client };
};
