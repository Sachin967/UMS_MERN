import React, { useState } from 'react'

const EditModal = ({ user, onUpdate, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user) // Initialize state with user data

  const handleInputChange = (e) => {
    // Update the editedUser state when input fields change
    const { name, value } = e.target
    setEditedUser({
      ...editedUser,
      [name]: value,
    })
  }

  const handleUpdate = () => {
    // Call onUpdate with the edited user data
    onUpdate(editedUser)
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* Modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <p className="text-center text-lg font-semibold mb-4">
              Edit User Data
            </p>
            <form>
              {/* User data input fields */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-400"
                  // Add onChange handler and value to bind to user data
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-400"
                  // Add onChange handler and value to bind to user data
                />
              </div>
              {/* Additional input fields for user data */}
            </form>
            <div className="text-center">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditModal
