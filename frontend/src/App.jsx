import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import HomeScreen from './components/Hero'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminHeader from './adminComponents/AdminHeader'
const App = () => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <>
      {isAdmin ? <AdminHeader /> : <Navbar />}
      <ToastContainer />
      <Outlet />
    </>
  )
}
export default App
