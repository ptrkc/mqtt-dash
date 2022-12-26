import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConnectPage } from '@/pages/ConnectPage';
import { DashHomePage } from '@/pages/DashHomePage';
import { AddBlockPage } from './pages/AddBlockPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConnectPage />,
  },
  {
    path: 'home',
    element: <DashHomePage />,
  },
  {
    path: 'block/add',
    element: <AddBlockPage />,
  },
  // {
  //   path: 'block/:id',
  //   element: <DashHomePage />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
