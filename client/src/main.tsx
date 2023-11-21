import ReactDOM from 'react-dom/client'
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>,
)
