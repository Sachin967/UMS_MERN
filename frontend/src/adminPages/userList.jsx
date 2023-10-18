import { useGetUsersMutation } from '../slices/adminSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../adminComponents/Table'
const Userlist = ({}) => {
  const [users, setUsers] = useState([])
  const [getuserData, { isLoading }] = useGetUsersMutation()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getuserData()
        const data = response.data
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata()
  }, [])
  const handleClick = () => {
    navigate('/admin/adduser')
  }
  if (users.length > 0) {
    return <Table users={users} />
  } else {
    return (
      <>
        <h1 className="text-3xl text-center my-10">No Users</h1>
        <button
          className="block mx-auto px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:outline-none"
          onClick={handleClick}
        >
          Add User
        </button>
      </>
    )
  }
}

export default Userlist
