import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './pages/dashboard.tsx'
import { Login } from './pages/login.tsx'
import { ProtectedRoute } from './components/protectedRoute.tsx'
import { LoginRoute } from './components/loginRoute.tsx'
import { NotFound } from './pages/404.tsx'
import { Root } from './pages/root.tsx'
import { HomeDashboard } from './components/homeDashboard.tsx'
import { Settings } from './components/settings.tsx'
import { Dates } from './components/dates/dates.tsx'
import { Register } from './components/users/register.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useVerify } from './hooks/useVerify.tsx'
import { useUserStatus } from './store/useUserStatus.tsx'
import { useEffect } from 'react'
import { LoadingGlobal } from './components/loadingGlobal.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <HomeDashboard />
      },
      {
        path: 'dates',
        element: <Dates />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'users',
        element: <Register />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginRoute><Login /></LoginRoute>
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export const App = () => {

  const token = useUserStatus()
  const data = useVerify(token)
  const url = window.location.protocol+"//"+window.location.host+"/login"
  const urlBase = window.location.protocol+"//"+window.location.host
  const urlCurrent = window.location.href
  const { setSession } = useUserStatus()

  useEffect(() => {
    if(url !== urlCurrent && token.token.length < 1 && urlCurrent !== urlBase ){
      token.closeSesion()
    }
  },[])

  useEffect(() => {
      switch (data?.data?.data?.status){
        case "auth:login:invalid":{
          token.closeSesion()
          return
        }
        case "auth:login:expired": {
          token.closeSesion()
          return
        }
        case "global:server-error": {
          token.closeSesion()
          return
        }
        case "auth:login:verified": {
          setSession(data?.data?.data?.data?.session?.newToken?.value,data?.data?.data?.data?.user?.role)
          return
        }
      }
  },[data.isFetching])

  if(data.isFetching) return <LoadingGlobal />

  return <>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
  </>
}

export default App
