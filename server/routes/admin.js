import express from 'express'
import { addDepartment,
         adminCheck,
         adminLogin, 
         approveDoctor,
         blockDoctor, 
         blockUser, 
         getDepartments, 
         getDoctor, 
         getNewDoctors, 
         getUsers , 
         listDepartment, 
         rejectDoctor, 
         unBlockDoctor, 
         unBlockUser, 
         unlistDepartment} from '../controllers/adminController.js'
const router = express.Router()



router.get('/getUsers',getUsers)
router.get('/blockUser/:id',blockUser)
router.get('/unBlockUser/:id',unBlockUser)
router.get('/getDoctorList',getDoctor)
router.get('/blockDoctor/:id',blockDoctor)
router.get('/unBlockDoctor/:id',unBlockDoctor)
router.get('/getNewDoctors',getNewDoctors)
router.get('/approve/:id',approveDoctor)
router.post('/reject',rejectDoctor)
router.post('/logIn',adminLogin)
router.post('/addDepartment',addDepartment)
router.get('/departments',getDepartments)
router.get('/unListDepartment/:id',unlistDepartment)
router.get('/listDepartment/:id',listDepartment)
router.get('/authenticate',adminCheck)


export default router