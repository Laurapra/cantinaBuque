import { produce } from "immer";
import Cookies from 'js-cookie'
import { generalEndpoints } from "../domain/general.api"
import { IUserData, User } from "../interfaces/api.interfaces";
import { setter as GeneralSetter, IGeneral } from "./general.store";


export const loginUser = async (data: { identifier: string; password: string }) => {

  try {
    const res = (await generalEndpoints.login(data)).data as IUserData

    GeneralSetter(produce((draft: IGeneral) => {
      draft.userInfo = res
      draft.isLogged = true
    }))

    // Cookies.set(import.meta.env.USER_TOKEN, res.jwt)
    Cookies.set("USER_TOKEN", res.jwt)

    return true
  } catch (error) {
    console.log('error', error)

    GeneralSetter(produce((draft: IGeneral) => {
      draft.userInfo = undefined
      draft.isLogged = false
    }))

    return false
  }

}

export const logout = () => {
  Cookies.remove(import.meta.env.USER_TOKEN)
  GeneralSetter(produce((draft: IGeneral) => {
    draft.userInfo = undefined
    draft.isLogged = false
  }))
}

export const checkUser = async (jwt: string) => {

  try {
    const res = (await generalEndpoints.checkJWT(jwt)).data as User

    GeneralSetter(produce((draft: IGeneral) => {
      draft.userInfo = {
        jwt,
        user: res
      }
      draft.isLogged = true
    }))

    return true

  } catch (error) {
    GeneralSetter(produce((draft: IGeneral) => {
      draft.userInfo = undefined
      draft.isLogged = false
    }))

    return false
  }



}