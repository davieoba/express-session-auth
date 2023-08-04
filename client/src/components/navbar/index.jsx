import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"

export const Navbar = () => {
  const location = useLocation()
  const fetchUser = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/user', { withCredentials: true })
    return response.data
  }

  const { data } = useQuery(['getUser'], fetchUser)

  return (
    <nav className="col-span-full flex items-center justify-between py-4 border-b px-24">
      <h1 className="font-bold text-[3rem]">
        <Link to='/'>Sage</Link>
      </h1>
      <div className="flex justify-end gap-x-12 items-center">
        {data?.user ? (
          <button
            onClick={async () => {
              console.log('log out the user')
              await axios.get('/api/v1/auth/logout')
              window.location.reload(true)
            }}
            className="px-4 py-2 border rounded-md font-medium text-[1.4rem]">
            Logout
          </button>
        ) : (
            location.pathname === '/auth/login' ? <Link
              to='/auth/register'
              className="px-4 py-2 border rounded-md font-medium text-[1.4rem]">
              Register
            </Link> : <Link
              to='/auth/login'
              className="px-4 py-2 border rounded-md font-medium text-[1.4rem]">
              Login
            </Link>
        )}
      </div>
    </nav>
  )
}
