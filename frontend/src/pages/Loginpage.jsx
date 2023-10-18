import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userapiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const Loginpage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
useEffect(() => {
  if (userInfo) {
    if (
      userInfo.userRole !== 'admin' ||
      userInfo.userInfo.userRole !== 'admin'
    ) {
      navigate('/') // Redirect when both userRole and userInfo.userRole are not 'admin'
    }
  }
}, [navigate, userInfo])
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ email, password }).unwrap()
      const { userRole, userInfo } = res // Assuming these fields exist in the response
      dispatch(setCredentials({ userRole, userInfo }))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Log In</h1>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-6">
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
          {isLoading && (
            <h2>
              <Loader />
            </h2>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        <div className="mt-4 ">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/register" className="text-blue-500 ml-2 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </>
  )
}
export default Loginpage
