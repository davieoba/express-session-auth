/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { useEffect, useState } from 'react'
import { SvgSpinners90Ring } from '../icons'
import { Navbar } from '../navbar'

function Protected({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)

  const { isLoggedIn } = useAuth()

  useEffect(() => {
    setIsAuthenticated(isLoggedIn)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [isLoggedIn])

  const location = useLocation()

  if (isAuthenticated === null) {
    return (
      <div>
        {loading ? <LoadingPage /> : null}
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to={'/auth/login'} state={{ from: location }} replace />
}
export default Protected

const LoadingPage = () => {
  return (
    <div className='grid grid-cols-12'>
      <Navbar />
      <div className='col-span-full flex items-center justify-center h-screen overflow-hidden'>
        <SvgSpinners90Ring className='h-12 w-12' />
      </div>
    </div>
  )
}