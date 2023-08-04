import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/auth/login'
import Dashboard from './pages/dashboard'

import Register from './pages/auth/register'
import Protected from './components/protected'
import ForgotPassword from './pages/auth/forgotpassword'
import ResetPassword from './pages/auth/resetPassword'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/auth/reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: '/dashboard',
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    )
  }
])

function App() {

  return (
    <section>
      <RouterProvider router={router} />
    </section>
  )
}

export default App
