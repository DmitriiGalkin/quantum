import React, { createContext, useContext } from 'react'
import { useNavigate, useOutlet, useSearchParams } from 'react-router-dom'
import { useLocalStorage, useToggle } from 'usehooks-ts'

import Login from '../dialogs/Login'
import { Passport, User } from './dto'
import service, { usePassport } from './service'
import {useFast} from "./fast";

export const ACCESS_TOKEN = 'access_token'
export const AuthContext = createContext<Auth>({
  openLogin: () => true,
  logout: () => true,
  refetch: () => true,
  setSelectedUserId: () => true,
})

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const navigate = useNavigate()

  const { data: passport, refetch } = usePassport()
  const [searchParams] = useSearchParams()
  const tokenSearchParam = searchParams.get('access_token')
  const accessToken = localStorage.getItem(ACCESS_TOKEN) || tokenSearchParam
  const [openLogin, toggleOpenLogin] = useToggle()
  const isAuth = Boolean(accessToken)
  const [selectedUserId, setSelectedUserId] = useLocalStorage('selectedUserId', 0)

  if (tokenSearchParam) {
    localStorage.setItem(ACCESS_TOKEN, tokenSearchParam)
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    service.interceptors.request.use((config) => {
      config.headers.Authorization = undefined
      return config
    })
    navigate('/', { replace: true })
  }

  const user = passport?.users.length
    ? passport?.users.find((u) => u.id === selectedUserId) || passport?.users[0]
    : undefined

  useFast(isAuth)

  return (
    <AuthContext.Provider
      value={{
        user,
        passport,
        isAuth,
        openLogin: toggleOpenLogin,
        // access_token: accessToken,
        logout,
        setSelectedUserId,
        refetch,
      }}
    >
      {children}
      <Login open={openLogin} onClose={toggleOpenLogin} />
    </AuthContext.Provider>
  )
}

export interface Auth {
  user?: User
  passport?: Passport
  isAuth?: boolean
  openLogin: () => void
  logout: () => void
  refetch: () => void
  setSelectedUserId: (userId: number) => void
}

export const useAuth = (): Auth => {
  return useContext(AuthContext)
}

export const AuthLayout = (): JSX.Element => {
  const outlet = useOutlet()
  return <AuthProvider>{outlet as JSX.Element}</AuthProvider>
}
