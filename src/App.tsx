import { RouterProvider } from 'react-router-dom';
import './App.less';
import router from './router';

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
