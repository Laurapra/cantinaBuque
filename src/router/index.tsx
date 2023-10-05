import { Outlet, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { UserProducts } from "../pages/UserProducts";
import { ShoppingCart } from "../pages/ShoppingCart"
import { AuthPage } from "../pages/Auth";
import { AuthLayout, PrincipalLayout } from "../Layout";
import { AvailableProducst } from "../pages/AvailableProducts";

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
            path: "/availableProducts",
            element: <AvailableProducst/>
          },
          {
            path: "/bills",
            element: <UserProducts/>
          },
          {
            path: "/ventas",
            element: <ShoppingCart/>
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