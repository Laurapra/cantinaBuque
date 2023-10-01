import { Outlet, createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <>Inicio</>
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