import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Home from "./components/Home";
import Register from "./pages/Register.jsx";
import Error from './pages/Error';
import React from 'react'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);