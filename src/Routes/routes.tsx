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
    path: "/dashboard",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default routes;
