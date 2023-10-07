import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import { useEffect } from "react"
import { checkUser } from "./store/general.actions"
import { useShallowGeneralStore } from "./store/general.store"
import { Navbar } from "./components/Navbar"


export const AuthLayout = () => {
  const jwt = Cookies.get("USER_TOKEN")
  const [isLogged] = useShallowGeneralStore((state) => ([state.isLogged]))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(jwt) {
      checkUser(jwt)
    }
  }, [jwt])

  if(location.pathname == "/ventas" && !isLogged) return <Navigate to={"/"} />  

  return (
    <Outlet/>
  )
}

export const PrincipalLayout = () => {
  
  return (
    <>
      <Outlet />
    </>
  )
}