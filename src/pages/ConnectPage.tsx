import { useState } from "react";
import { redirect } from "react-router-dom";

export function ConnectPage() {
  const [url, setUrl] = useState("");
  const onClick = () => {
    //TODO:connect
    console.log("should redirect...");
    return redirect("/home");
  };
  return (
    <form>
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
