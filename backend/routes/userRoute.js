import express from 'express'
const router = express.Router()
import { upload } from '../multer.js'
import { userController } from '../controller/userController.js'
import { protect } from '../middleware/authmiddleware.js'
const { authUser, registerUser, logoutUser, getUserProfile, updateUser } =
  userController
router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('image'), updateUser)

export default router
 