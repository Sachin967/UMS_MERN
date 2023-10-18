import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userapiSlice'

function Navbar({}) {
  const { userInfo } = useSelector((state) => state.auth)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-white text-2xl font-semibold">Logo</a>
        <div className="space-x-4">
          {userInfo &&
          (userInfo.userRole === 'user' ||
            (userInfo.userInfo && userInfo.userInfo.userRole === 'user')) ? (
            <>
              <Link to="/profile" className="text-white">
                {userInfo.name || (userInfo.userInfo && userInfo.userInfo.name)}
              </Link>
              <button onClick={logoutHandler} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-white">
                Log In
              </Link>
              <Link to="/register" className="text-white">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
