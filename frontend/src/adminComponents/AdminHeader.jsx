import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/adminSlice'
import { logout } from '../slices/authSlice'

const AdminHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logoutapi] = useLogoutMutation()
  const handleLogout = async () => {
    await logoutapi().unwrap()
    dispatch(logout())
    navigate('/admin/login')
  }
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/admin' className="text-white text-2xl font-semibold">Admin</Link>
        <div className="space-x-4">
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default AdminHeader
