/* eslint-disable react/prop-types */
import { Dialog } from '@headlessui/react'
import { Navbar } from "../../components/navbar"
import { useState } from 'react'
import axios from 'axios'
import { SvgSpinners90Ring } from '../../components/icons'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  const fetchUser = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/user', { withCredentials: true })
    return response.data
  }

  const { data } = useQuery(['getUserData'], fetchUser)


  const fetchAllUsers = async () => {
    setIsOpen(true)
    const response = await axios.get('http://localhost:5000/api/v1/users/info', { withCredentials: true })

    setUsers(response.data.data.users)

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }


  return (
    <div>
      <Navbar />

      <section className="grid grid-cols-12">
        <section className="col-start-2 col-end-12 py-24 space-y-12">
          <h1 className="text-[2rem] font-bold">
            Dashboard
          </h1>

          <h2 className="text-[1.4rem] font-medium">
            Welcome, {data && data?.user?.name}
          </h2>

          {data?.user?.role === 'admin' ? (
            <button
            onClick={fetchAllUsers}
            className="text-[1.4rem] px-4 py-3 font-medium rounded-md border">View all users
            </button>) : null
          }


        </section>
      </section>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} users={users} loading={loading} />
    </div>
  )
}

export default Dashboard

const Modal = ({ isOpen, setIsOpen, users, loading }) => {
  const styles = {
    btn: `text-[1.4rem] font-medium border rounded-md px-4 py-3`
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 space-y-8">
        <Dialog.Panel className="w-5/12 p-10 text-[1.4rem] rounded-xl bg-white space-y-8">
          <Dialog.Title className='font-semibold'>Deactivate account</Dialog.Title>
          <Dialog.Description className='text-[1.2rem]'>
            This will permanently deactivate users account
          </Dialog.Description>

          {loading ?
            <SvgSpinners90Ring className='h-10 w-10' />
            :
            (
              <ul className='text-[1.4rem] font-medium space-y-3'>
                {users && users.map((user) => {
                  return <li key={user.googleId} className='flex items-center justify-between'>
                    <span className='text-[1.4rem] font-medium'>{user.name}</span>
                    <button className='border px-4 py-3 text-[1.4rem] font-medium rounded-md bg-red-500 text-white'>Deactivate</button>
                  </li>
                })}
              </ul>
            )}

          <button className={styles.btn} onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}