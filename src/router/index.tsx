import Home from '@/screens/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
    },
]);

export default router;
