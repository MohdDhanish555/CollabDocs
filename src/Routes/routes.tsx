import { createBrowserRouter, Navigate } from "react-router";

import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";

const routes = createBrowserRouter([
  {
    path: "/auth",
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
    element: <>Home</>,
  },
]);

export default routes;
