import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import SingleMeal from './pages/SingleMeal';
import NoMatch from './pages/NoMatch';
import Login from './pages/LogIn';
import Signup from './pages/SignUp';
import OrderStory from './pages/OrderStory';
import Success from './pages/Success';
import Maps from './pages/Maps';
import Maps2 from './pages/Maps2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/maps',
        element: <Maps />
      },
      {
        path: '/maps2',
        element: <Maps2 />
      },
      {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/orderStory',
        element: <OrderStory />
      }, {
        path: '/meals/:id',
        element: <SingleMeal />
      }, {
        path: '/success',
        element: <Success />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
