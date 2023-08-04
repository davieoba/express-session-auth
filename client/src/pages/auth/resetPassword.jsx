import { Link } from "react-router-dom"

const ResetPassword = () => {
  const handleResetPasswordAuth = () => { }

  return (
    <div className="grid grid-cols-12">
      <nav className="col-span-full flex items-center justify-between py-4 border-b px-24">
        <h1 className="font-bold text-[3rem]">
          <Link to='/'>Sage</Link>
        </h1>
      </nav>

      <section className="col-span-full py-24">
        <form className='w-[40rem] max-w-[40rem] mx-auto rounded-2xl border shadow-md space-y-12 p-8'>
          <h1 className='text-[2.4rem] font-semibold'>Reset Password</h1>

          <p className='text-[1.4rem] font-medium text-[#686868]'>Enter new Password!</p>
          <div>
            <label htmlFor="password" className='block text-[1.4rem] mb-1 font-medium text-[#686868]'>Password</label>
            <input type="password" placeholder='Password' id="password" name="password" className='border h-[4rem] px-4 rounded-md text-[1.4rem] font-medium w-full' />
          </div>

          <div>
            <label htmlFor="confirm-password" className='block text-[1.4rem] mb-1 font-medium text-[#686868]'>Confirm Password</label>
            <input type="password" id="confirm-password" placeholder='Confirm Password' name="confirmPassword" className='border h-[4rem] px-4 rounded-md text-[1.4rem] font-medium w-full' />
          </div>

          <button
            type='submit'
            onClick={handleResetPasswordAuth}
            className='w-full h-[4rem] text-[1.4rem] font-medium rounded-md bg-blue-500 text-white'>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default ResetPassword