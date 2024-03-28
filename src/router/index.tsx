import Home from '@/screens/pages/Home';
import Login from '@/screens/pages/Login';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/login'} />,
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/edit',
        element: <Home></Home>,
    },
]);

export default router;
