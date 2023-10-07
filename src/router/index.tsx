import { Outlet, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { BillByIdPage, UserProducts } from "../pages/UserProducts";
import { ShoppingCart } from "../pages/ShoppingCart"
import { AuthPage } from "../pages/Auth";
import { AuthLayout, PrincipalLayout } from "../Layout";
import { AvailableProducst } from "../pages/AvailableProducts";
import { AddProductPage } from "../pages/AddProductPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <PrincipalLayout />,
        children: [
          {
            path: "/",
            element: <HomePage/>
          },
          
          {
              
            path: "bills",
            element: <UserProducts/>,
            children: [
              {
                path: ":id",
                element: <BillByIdPage />
              }
            ],
          },
          {
            path: "availableProducts",
            element: <AvailableProducst/>
          },
          
          {
            path: "ventas",
            element: <ShoppingCart/>
          },
          {
            path: "/addProduct",
            element: <AddProductPage/>
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