import asyncHandler from 'express-async-handler'
import Admin from '../model/adminModel.js'
import generateToken from '../utils/generateToken.js'
import User from '../model/userModel.js'

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id, 'admin')

    res.json({
      userRole: 'admin', // Include the user's role here (e.g., 'user' or 'admin')
      userInfo: {
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        userRole: 'admin',
      },
    })
  } else {
    res.status(401)
    throw new Error('Incorrect email or password')
  }
})

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(400)
    throw new Error('User already Exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const emailExists = await Admin.findOne({ email })

  if (emailExists) {
    res.status(400)
    throw new Error('Admin already exists')
  }

  const admin = await Admin.create({
    email,
    password,
  })

  if (admin) {
    generateToken(res, admin._id, 'admin')
    res.status(201).json({
      userRole: 'admin', // Include the user's role here (e.g., 'user' or 'admin')
      userInfo: {
        _id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Loggged out' })
})
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
})
const editUser = asyncHandler(async (req, res) => {
 const{_id}=req.body
  const user = await User.findById(_id)
  if (user) {
    user.name = req.body.name
    user.email = req.body.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      success:true,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

const deleteUser = asyncHandler(async (req, res) => {
 const {userId}= req.body
  const deleteduser = await User.findByIdAndDelete(userId)
  if (!deleteduser) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  res.status(200).json({ success: true, message: 'User deleted successfully' })
})

export {
  addUser,
  authAdmin,
  editUser,
  getUsers,
  deleteUser,
  registerAdmin,
  logoutAdmin,
}
