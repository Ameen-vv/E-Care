import express from 'express'
import { adminLogin, approveDoctor, blockDoctor, blockUser, getDoctor, getNewDoctors, getUsers , rejectDoctor, unBlockDoctor, unBlockUser} from '../controllers/adminController.js'
const router = express.Router()



router.get('/getUsers',getUsers)
router.get('/blockUser/:id',blockUser)
router.get('/unBlockUser/:id',unBlockUser)
router.get('/getDoctorList',getDoctor)
router.get('/blockDoctor/:id',blockDoctor)
router.get('/unBlockDoctor/:id',unBlockDoctor)
router.get('/getNewDoctors',getNewDoctors)
router.get('/approve/:id',approveDoctor)
router.get('/reject/:id',rejectDoctor)
router.post('/logIn',adminLogin)


export default router