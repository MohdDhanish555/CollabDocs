import { createBrowserRouter, Navigate, Outlet } from "react-router";

import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";
import { AuthenticatedRoute, UnAuthenticatedRoute } from "./Authentication";
import AppLayout from "../Components/Layout/AppLayout";
import Dashboard from "../Components/Dashboard/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <UnAuthenticatedRoute>
        <Outlet />
      </UnAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default routes;
