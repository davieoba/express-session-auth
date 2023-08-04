import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Navbar } from "../../components/navbar"

const Home = () => {
  const navigate = useNavigate()
  const fetchUser = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/user', { withCredentials: true })
    return response.data
  }

  const { data } = useQuery(['getUserData'], fetchUser, { retry: 2 })

  return (
    <div className="grid grid-cols-12">
      <Navbar />
      <main className="col-span-full px-24 py-12 space-y-12">
        <section className="flex justify-end">
          {['admin', 'user'].includes(data?.user.role) ? (
            <button
              className='rounded-md py-3 px-4 border text-[1.4rem]'
              onClick={() => navigate('/dashboard')}>
              Go to the dashboard
            </button>
          ) : null}

        </section>
        <h1 className="text-2xl font-bold"> Welcome {data && data?.user?.name} to the home page </h1>
      </main>
    </div>
  )
}

export default Home