import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Signupage from './pages/Signupage.jsx'
import Profilepage from './pages/Profilepage.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminLoginpage from './adminPages/Loginpage.jsx'
import UserList from './adminPages/userList.jsx'
import { AdminPrivateRoute } from './adminComponents/AdminPrivateRoute.jsx'
import AddUser from './adminPages/AddUser.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homepage />} />
      <Route path="/signin" element={<Loginpage />} />
      <Route path="/register" element={<Signupage />} />
      <Route path="/admin/login" element={<AdminLoginpage />} />

      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profilepage />}></Route>
      </Route>
      <Route path='' element={<AdminPrivateRoute/>}>
        <Route path="/admin" element={<UserList />}></Route>
        <Route path='/admin/adduser' element={<AddUser/>}></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={route} />
    </React.StrictMode>
  </Provider>
)
