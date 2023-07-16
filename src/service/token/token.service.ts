import { ILoginResponse } from "../../core/public/Login/Login.interface"

export type TokenData = ILoginResponse | undefined

const tokenKey = `rv.user:token`

const getStorageData = () => {
  let token: TokenData | null = null
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    token = JSON.parse(sessionStorage.getItem(tokenKey) as string)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Get Token Err', err)
  }

  return token
}

const getAccessToken = () => getStorageData()?.accessToken
const getRefreshToken = () => getStorageData()?.refreshToken
const getUserData = () => getStorageData()?.user
const clearToken = () => sessionStorage.removeItem(tokenKey)
const setToken = (data: TokenData) =>
  sessionStorage.setItem(tokenKey, JSON.stringify(data))

const TokenService = {
  getAccessToken,
  getRefreshToken,
  clearToken,
  getUserData,
  setToken,
  getStorageData,
}

export default TokenService
