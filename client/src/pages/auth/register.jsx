import axios from "axios"
import { useState } from "react"
import { Navbar } from "../../components/navbar"

const Register = () => {
  const styles = {
    label: `text-[1.4rem] font-medium block`,
    input: `text-[1.4rem] h-[4rem] font-medium px-4 rounded-md border w-full`
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleFormInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleClientRegister = async (e) => {
    e.preventDefault()
    const user = await axios.post('http://localhost:5000/api/v1/auth/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    })

    console.log({ user })
  }

  return (
    <section className="grid grid-cols-12">
      <Navbar />

      <section className="col-span-full mx-auto flex justify-center py-24">
        <div className="w-[40rem] border rounded-xl p-8 space-y-8">
          <form className="space-y-8">
            <h1 className="font-medium text-[1.5rem]">Register</h1>
            <div>
              <label htmlFor="email" className={styles.label}>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className={styles.input}
                name="name"
                value={formData.name}
                onChange={handleFormInputChange} />
            </div>

            <div>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                className={styles.input}
                name="email"
                value={formData.email}
                onChange={handleFormInputChange} />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className={styles.input}
                name="password"
                value={formData.password}
                onChange={handleFormInputChange} />
            </div>

            <button
              type="submit"
              onClick={handleClientRegister}
              className="bg-blue-500 h-[4rem] text-white rounded-md text-[1.4rem] font-medium w-full py-4">
              Register
            </button>
          </form>

          {/* <section className="flex items-center gap-x-8">
            <div className="h-1 flex-grow bg-slate-200"></div>
            <div className="font-medium text-[1.4rem] uppercase">OR</div>
            <div className="h-1 flex-grow bg-slate-200"></div>
          </section> */}

          {/* <section>
            <div>
              <button
                onClick={handleGoogleSSO}
                className="text-[1.4rem] font-medium px-4 h-[4rem] border rounded-md w-full flex items-center justify-center gap-x-6">
                <span className='text-[1.4rem]'>Google</span>
                <img src={Google} alt='google' className="h-8 w-8" />
              </button>
            </div>
          </section> */}
        </div>

      </section>


    </section >
  )
}

export default Register