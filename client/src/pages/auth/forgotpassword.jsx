/* eslint-disable react/prop-types */
import { Dialog } from "@headlessui/react"
import { XMarkIcon } from '../../components/icons'
import { SvgSpinners90Ring } from "../../components/icons"
import { useState } from "react"
import { Link } from "react-router-dom"

export const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 3000)


  const handleForgotPasswordAuth = (e) => {
    e.preventDefault()

    setIsOpen(true)
  }

  return (
    <div className='grid grid-cols-12'>
      <section className='col-span-full p-24 space-y-24'>
        <div>
          <Link to='/auth/login' className='font-medium text-[1.4rem] text-blue-500 underline underline-offset-2'>
            Return to Sign in page
          </Link>
        </div>

        <form className='w-[40rem] max-w-[40rem] mx-auto rounded-2xl border shadow-md space-y-12 p-8'>
          <h1 className='text-[2.4rem] font-semibold'>Forgot Password</h1>

          <p className='text-[1.4rem] font-medium text-[#686868]'>Forgot your password? We have got your back!</p>
          <div>
            <label htmlFor="email" className='block text-[1.4rem] mb-1 font-medium text-[#686868]'>Email</label>
            <input type="text" placeholder='Email Address' className='border h-[4rem] px-4 rounded-md text-[1.4rem] font-medium w-full' />
          </div>

          <button
            type='submit'
            onClick={handleForgotPasswordAuth}
            className='w-full h-[4rem] text-[1.4rem] font-medium rounded-md bg-blue-500 text-white'>Submit</button>
        </form>
      </section>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} />
    </div>
  )
}

export default ForgotPassword

const Modal = ({ isOpen, setIsOpen, loading }) => {
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
          <div className="flex items-center justify-between">
            <Dialog.Title className='font-semibold text-[2rem] text-center'>Password Recovery Email Sent</Dialog.Title>
            <div className="h-12 w-12 rounded-full border flex items-center justify-center">
              <XMarkIcon className='h-8 w-8 text-black' />
            </div>
          </div>

          {loading ?
            <SvgSpinners90Ring className='h-10 w-10' />
            :
            (
              <Dialog.Description className='text-[1.4rem] text-[#686868] font-medium'>
                Resest password link sent successfully
              </Dialog.Description>
            )}

          <button className={styles.btn} onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}