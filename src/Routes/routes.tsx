import { createBrowserRouter, Navigate, Outlet } from "react-router";

import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";
import { AuthenticatedRoute, UnAuthenticatedRoute } from "./Authentication";
import Home from "../Components/Home/Home";

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
    path: "/app",
    element: (
      <AuthenticatedRoute>
        <Home />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/app" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/app" replace />,
  },
]);

export default routes;
