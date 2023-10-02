import { Outlet, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { UserProducts } from "../pages/UserProducts";
import { AuthPage } from "../pages/Auth";
import { AuthLayout, PrincipalLayout } from "../Layout";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <PrincipalLayout />,
        children: [
          {
            path: "/",
            element: <HomePage/>
          },
          {
            path: "/mis-pedidos",
            element: <UserProducts/>
          },
          {
            path: "/todos-los-pedidos",
            element: <>Todos los pedidos</>
          },
          {
            path: "/ventas",
            element: <>Ventas</>
          }
        ]
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthPage />
  },
])