import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../page/layout';
import Month from '../page/month';
import New from '../page/new';
import Year from '../page/year';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/month" replace />
      },
      {
        path: '/month',
        element: <Month />
      },
      {
        path: '/year',
        element: <Year />
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  }
])
export default router;