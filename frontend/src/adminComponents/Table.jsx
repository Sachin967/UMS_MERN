import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import {
  useDeleteuserMutation,
  useUpdateuserMutation,
} from '../slices/adminSlice'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { useState } from 'react'
import DeleteConfirmationModal from './DeleteModal'
import { useDispatch } from 'react-redux'
import EditUserModal from './EditModal'
import { deleteUser } from '../slices/authSlice'
function Table({ users }) {
  const [searchQuery, setsearchQuery] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false) // State to control the modal visibility
  const [userToDelete, setUserToDelete] = useState(null) // State to track the user to be deleted
  const [showEditModal, setShowEditModal] = useState(false) // State to control the edit modal visibility
  const [userToEdit, setUserToEdit] = useState(null) // State to store the user data for editing

  const navigate = useNavigate()
  const [deleteuser, { isLoading }] = useDeleteuserMutation()
  const [updateuser] = useUpdateuserMutation()
  const dispatch = useDispatch()
  // Function to open the edit modal
  const openEditModal = (user) => {
    setUserToEdit(user)
    setShowEditModal(true)
  }

  // Function to close the edit modal
  const closeEditModal = () => {
    setUserToEdit(null)
    setShowEditModal(false)
  }
  const handleUpdateUser = async (updatedUserData) => {
    const { _id, name, email } = updatedUserData
    const response = await updateuser({ _id, name, email }).unwrap()
    console.log(response)
    setUserToEdit(response)

    closeEditModal()
  }
  const showDeleteConfirmation = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  // Function to hide the delete confirmation modal
  const hideDeleteConfirmation = () => {
    setUserToDelete(null)
    setShowDeleteModal(false)
  }

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    if (userToDelete) {
      const userId = userToDelete._id
      await deleteuser({ userId })
     dispatch(deleteUser(userToDelete._id))

      hideDeleteConfirmation()
      window.location.reload()
    }
  }

  const searchOnChange = (e) => {
    setsearchQuery(e.target.value)
  }
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })
  const handleClick = () => {
    navigate('/admin/adduser')
  }
  return (
    <>
      <div className="p-5 relative">
        <input
          value={searchQuery}
          onChange={searchOnChange}
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:bg-white focus:ring focus:border-blue-300"
        />
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Name</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Email
            </th>

            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>

              <td className="border border-slate-700 rounded-md text-center">
                {user.name}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {user.email}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <button onClick={() => openEditModal(user)}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </button>
                  <button onClick={() => showDeleteConfirmation(user)}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="block mx-auto px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:outline-none"
        onClick={handleClick}
      >
        Add User
      </button>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={hideDeleteConfirmation}
          onDelete={handleDeleteUser}
        />
      )}
      {showEditModal && (
        <EditUserModal
          user={userToEdit}
          onUpdate={handleUpdateUser}
          onCancel={closeEditModal}
        />
      )}
    </>
  )
}
export default Table
