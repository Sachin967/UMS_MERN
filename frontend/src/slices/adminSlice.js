import { apiSlice } from './apiSlice'
const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getusers`,
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
      }),
    }),
    adduser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adduser`,
        method: 'POST',
        body: data,
      }),
    }),
    updateuser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/edituser`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteuser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/deleteuser`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
})

export const {
  useAdminloginMutation,
  useGetUsersMutation,
  useLogoutMutation,
  useUpdateuserMutation,
  useDeleteuserMutation,
  useAdduserMutation
} = adminApiSlice
