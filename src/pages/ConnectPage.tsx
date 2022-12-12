import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClient } from "../hooks/useClient";

export function ConnectPage() {
  const navigate = useNavigate();
  const { connect } = useClient();
  const [url, setUrl] = useState("127.0.0.1:9001");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const connected = await connect(url);
    return navigate("/home");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button>connect</button>
    </form>
  );
}
