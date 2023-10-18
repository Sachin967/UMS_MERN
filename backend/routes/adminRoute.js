import express from 'express'
const router = express.Router()
import {authAdmin,addUser,editUser,getUsers,deleteUser,registerAdmin, logoutAdmin} from '../controller/adminController.js'
import { protect } from '../middleware/authmiddleware.js'
router.post('/auth',authAdmin)
router.post('/adduser',protect,addUser)
router.post('/getusers',protect,getUsers)
router.put('/edituser',protect,editUser)
router.delete('/deleteuser',protect,deleteUser)
router.post('/register',registerAdmin)
router.post('/logout',logoutAdmin)

export default router   