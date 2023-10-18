import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Unauthorised user')
  }
})
export { protect }
