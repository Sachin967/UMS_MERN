import React, { useState } from 'react'
import { useAdduserMutation } from '../slices/adminSlice'
import { useNavigate } from 'react-router-dom'
function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const [adduser, { isLoading }] = useAdduserMutation()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { name, email, password } = formData
      const res = await adduser({ name, email, password }).unwrap()
      if (res.success) {
        navigate('/admin')
      }
    } catch (error) {
      console.log(err.error)
    }
  }

  return (
    <div className="bg-gray-200 p-4">
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
