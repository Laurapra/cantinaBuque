import { produce } from "immer"
import Cookies from 'js-cookie'
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import { IUserData } from "../interfaces/api.interfaces"

export interface IGeneral {
  userInfo?: IUserData
  isLogged?: boolean

  homeLoading?: boolean
}


export interface IGeneralActions {
  setHomeLoading: (isLoading: boolean) => void
  setLoginUser: (data: IUserData) => void,
  logout: () => void,
}

/*------------------- store -------------------*/

const useGeneral = create<IGeneral & IGeneralActions>()(devtools((set, get) => ({
  isLogged: undefined,

  setLoginUser: (data) => {
      set(produce((draft: IGeneral) => {
          draft.isLogged = true
          draft.userInfo = data
      }), false, { type: "general/setLoginUser" })
  },
  logout: () => {
      set(produce((draft: IGeneral) => {
          draft.isLogged = undefined
          draft.userInfo = undefined
      }), false, { type: "general/logout" })

      Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
      Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_USER)
  },
  setHomeLoading: (isLoading) => {
      set(produce((draft: IGeneral) => {
          draft.homeLoading = isLoading
      }), false, { type: "general/setHomeLoading" })
  }
  


}), {
  enabled: import.meta.env.DEV,
  anonymousActionType: "general"
}))

/*------------------- store functions -------------------*/

// basic store functions
export const setter = useGeneral.setState;
export const getter = useGeneral.getState;

// hooks selectors
export const isLoged = () => useGeneral((state) => state.isLogged, shallow)

/**
* return general state value and/or funtions implementing a shallow option
* @param selector funtions selector
* @returns 
*/
export const useShallowGeneralStore = <U>(selector: (state: IGeneral & IGeneralActions) => U) => {
  return useGeneral(selector, shallow);
};

export default useGeneral