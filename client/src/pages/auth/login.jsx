import { useState } from 'react'
import axios from 'axios'
import Google from '../../assets/MdiGoogle.svg'
import { Navbar } from '../../components/navbar'

const Login = () => {
  const styles = {
    label: `text-[1.4rem] font-medium block`,
    input: `text-[1.4rem] h-[4rem] font-medium px-4 rounded-md border w-full`
  }
  const [errorAuthMessage, setErrorAuthMessage] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const fetchUser = async () => {
    let status, message
    // eslint-disable-next-line no-unused-vars
    let url = ''

    const response = await axios.get('http://localhost:5000/api/v1/user', { withCredentials: true }).catch((err) => {
      status = err.response.status
      url = err.response.data.redirectUrl
      message = err.response.data.message

      setTimeout(() => {
        setErrorAuthMessage(null)
      }, 5000)
    })

    if (status === 401) {
      return setErrorAuthMessage(message)
    }

    // return response.data.user
    console.log('fetch the user information', response.data.user)
    window.location.href = '/'
  }

  const handleGoogleSSO = () => {
    let timer = null
    const newAuthWindow = window.open('http://localhost:5000/api/v1/auth/google', '_blank', 'width=500, height=600')

    if (newAuthWindow) {
      timer = setInterval(() => {
        if (newAuthWindow.closed) {
          console.log('Authenticated')
          fetchUser()

          if (timer) {
            clearInterval(timer)
          }
        }
      }, 500)
    }
  }

  const handleFormInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleLoginCredentials = async (e) => {
    e.preventDefault()

    const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
      email: formData.email,
      password: formData.password
    })

    console.log('this is the login response', response.data)
  }

  return (
    <section className="grid grid-cols-12">
      <Navbar />

      <section className="col-span-full mx-auto flex justify-center py-24">
        <div className="w-[40rem] border rounded-xl p-8 space-y-8">
          <form className="space-y-8">
            {errorAuthMessage && <p className='text-red-500 text-[1.4rem] font-medium'> {errorAuthMessage} </p>}
            <h1 className="font-medium text-[1.5rem]">Login</h1>
            <div>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="text" placeholder="Enter Email" className={styles.input} name='email' value={formData.email} onChange={handleFormInputChange} />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" placeholder="Enter Password" className={styles.input} name='password' value={formData.password} onChange={handleFormInputChange} />
            </div>

            <button
              type='submit'
              onClick={handleLoginCredentials}
              className="bg-blue-500 h-[4rem] text-white rounded-md text-[1.4rem] font-medium w-full py-4">
              Login
            </button>
          </form>

          <section className='flex items-center justify-end'>
            <span className='text-[1.4rem] font-medium text-blue-500 hover:underline cursor-pointer'>Forgot password</span>
          </section>

          <section className="flex items-center gap-x-8">
            <div className="h-1 flex-grow bg-slate-200"></div>
            <div className="font-medium text-[1.4rem] uppercase">OR</div>
            <div className="h-1 flex-grow bg-slate-200"></div>
          </section>

          <section>
            <div>
              <button
                onClick={handleGoogleSSO}
                className="text-[1.4rem] font-medium px-4 h-[4rem] border rounded-md w-full flex items-center justify-center gap-x-6">
                <span className='text-[1.4rem]'>Google</span>
                <img src={Google} alt='google' className="h-8 w-8" />
              </button>
            </div>
          </section>
        </div>

      </section>


    </section>
  )
}

export default Login