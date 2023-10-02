import axios from "axios";


// axios config -----------------------------------
export const strapiApi = axios.create({
  // baseURL: `${import.meta.env.STRAPI_API}`,
  baseURL: `http://localhost:1337/api/`,
  headers: {
      "Content-Type": "application/json"
  }
})

export const generalEndpoints = {
  login: (data: { identifier: string; password: string }) => strapiApi.post("auth/local", data),
  checkJWT: (jwt: string) => strapiApi.get("users/me", {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}