import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  userRole: null, // Add a field to store the user's role
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.userInfo
      state.userRole = action.payload.userRole // Set the user's role
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.userInfo = null
      state.userRole = null // Clear the user's role
      localStorage.removeItem('userInfo')
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user._id !== action.payload)
    },
  },
})

export const { setCredentials, logout,deleteUser } = authSlice.actions

export default authSlice.reducer
