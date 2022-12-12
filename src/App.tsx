import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { ConnectPage } from "./pages/ConnectPage";
import { DashHomePage } from "./pages/DashHomePage";
import MQTTProvider from "./providers/MQTTProvider";
import { useClient } from "./hooks/useClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectPage />,
  },
  {
    path: "home",
    element: <DashHomePage />,
  },
]);

function App() {
  return (
    <MQTTProvider>
      <RouterProvider router={router} />
    </MQTTProvider>
  );
}

export default App;
