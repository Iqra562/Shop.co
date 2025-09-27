import React from 'react'
import {Home} from "./features/public/home/index"; 
import {WebLayout} from "./layouts/WebLayout";
import {Login} from "./features/auth/Login";
import {Signup} from "./features/auth/Signup"

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
    element: <WebLayout />,
    children: [
      { path: '/', element: <Home /> },
                { path: '/login', element: <Login /> },
                { path: '/signup', element: <Signup /> },
                { path: '*', element: <NotFound /> },
    ],
  },
];


