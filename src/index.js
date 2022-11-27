import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';

import './index.css';
import Favorites from './pages/Favorites';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);