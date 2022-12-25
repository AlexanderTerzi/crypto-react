import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store';

import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';

import './index.css';
import CryptoDetails from './components/CryptoDetails';
import NotFound from './pages/NotFound';


const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <Home />,
    children: [
      {
        path: "",
        element: <Crypto />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: `${process.env.PUBLIC_URL}/trending`,
        element: <Trending />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: `${process.env.PUBLIC_URL}/saved`,
        element: <Saved />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: `${process.env.PUBLIC_URL}/*`,
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);