import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/userapiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const Signupage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setconfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)
  
 useEffect(() => {
   if (userInfo) {
     if (
       userInfo.userRole !== 'admin' ||
       userInfo.userInfo.userRole !== 'admin'
     ) {
       navigate('/')
     }
   }
 }, [navigate, userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      toast.error("Password doesn't match")    
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <div className="container flex flex-1 justify-center items-center">
      <div className="w-full max-w-sm p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confpassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              onChange={(e) => setconfirmPassword(e.target.value)}
              value={confirmpassword}
              id="confpassword"
              name="confpassword"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {isLoading && <Loader />}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/signin" className="text-blue-500 ml-2 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Signupage
