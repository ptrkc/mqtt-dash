import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConnectPage } from './pages/ConnectPage';
import { DashHomePage } from './pages/DashHomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConnectPage />,
  },
  {
    path: 'home',
    element: <DashHomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
