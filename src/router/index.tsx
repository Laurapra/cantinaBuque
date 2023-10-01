import { Outlet, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { UserProducts } from "../pages/UserProducts";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
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
      }
    ]
  }
])