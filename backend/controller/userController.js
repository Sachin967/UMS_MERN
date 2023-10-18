import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'

const userController = {
  authUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id, 'user')
      res.json({
        userRole: 'user', // Include the user's role here (e.g., 'user' or 'admin')
        userInfo: {
          _id: user._id,
          email: user.email,
          name: user.name,
          userRole: 'user',
          profileImage: user.profileImage,
        },
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
    res.status(200).json({ message: 'Auth User' })
  }),
  registerUser: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const emailExists = await User.findOne({ email })

    if (emailExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      generateToken(res, user._id, 'user')
      res.status(201).json({
        userRole:'user',
        _id: user._id,
        email: user.email,
        name: user.name,
        
      })
    } else {
      res.status(400)
      throw new Error('Invalid data')
    }
  }),

  logoutUser: asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    res.status(200).json({ message: 'Loggged out' })
  }),

  updateUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
     if (!req.file) {
       // Handle the case where no file was uploaded
       return res.status(400).json({ message: 'No file uploaded' })
     }
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }

      if (req.file) {
        user.profileImage = req.file.filename || user.profileImage
      }
      const updatedUser = await user.save()

      res.status(200).json({
        userInfo: {
          _id: user._id,
          email: user.email,
          name: user.name,
          userRole: 'user',
          profileImage: user.profileImage,
        },
      })
    } else {
      res.status(400)
      throw new Error('User not found')
    }
  }),

  getUserProfile: asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    }
    res.status(200).json(user)
  }),
}
export { userController }
