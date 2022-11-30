import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Favorites from './pages/Favorites';

import './index.css';
import CryptoDetails from './components/CryptoDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: "/trending",
        element: <Trending />
      },
      {
        path: "/favorites",
        element: <Favorites />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);