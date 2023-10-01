import { Outlet, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";

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
        element: <>Mis pedidos</>
      },
      {
        path: "/todos-los-pedidos",
        element: <>Todos los pedidos</>
      }
    ]
  }
])