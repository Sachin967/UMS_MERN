import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
export const AdminPrivateRoute = () => {
 const { userInfo } = useSelector((state) => state.auth)
 return userInfo ? <Outlet /> : <Navigate to="/admin/login" replace />
}


