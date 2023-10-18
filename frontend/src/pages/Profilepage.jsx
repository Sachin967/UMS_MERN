import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateprofileMutation } from '../slices/userapiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
const Profilepage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState()
  const [confirmpassword, setconfirmPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updateprofile, { isLoading }] = useUpdateprofileMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || userInfo?.userInfo?.name)
      setEmail(userInfo.email || userInfo?.userInfo?.email)
    }
  }, [userInfo || userInfo.userInfo])
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    // Update the state with the selected file
    setImage(selectedFile)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmpassword) {
      toast.error("Password doesn't match")
    } else {
      try {
        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('email', email)
        formdata.append('password', password)
        formdata.append('image', image)
        const res = await updateprofile(formdata).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile Updated')
      } catch (err) {
        console.error(err.data)
      }
    }
  }
  return (
    <div className="container mx-96 p-4">
      <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confpassword" className="block text-gray-600">
            Confirm Password
          </label>
          <input
            onChange={(e) => setconfirmPassword(e.target.value)}
            value={confirmpassword}
            id="confpassword"
            name="confpassword"
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input onChange={handleImageChange} type="file" name="image" />
        </div>
        {image && (
          <div>
            <p>Selected Image:</p>
            <img src={URL.createObjectURL(image)} alt="Selected" />
          </div>
        )}
        {isLoading && <Loader />}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </form>
    </div>
  )
}
export default Profilepage
