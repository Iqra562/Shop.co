import React from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Home from '../../pages/Home';
import Login from '../../components/Login';
import Signup from '../../components/Signup';
import Layout from '../../pages/Layouts';


function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
    </div>
  );
}
export const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
                { path: '/privacy-policy', element: <Login /> },
                { path: '/privacy-policy', element: <Signup /> },
                { path: '*', element: <NotFound /> },
    ],
  },
];


