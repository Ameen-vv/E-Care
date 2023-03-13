import express from 'express'
const router = express.Router()
import {forgotPassOtp, getDepartment, getDoctors, getDoctorsByDep, resendOtp, resetPass, saveGoogleUser, sendOtp, signIn, userCheck, verifyOtpAndSignUp} from '../controllers/userControllers.js'
import { userAuthentication } from '../middlewares/Authentications.js'

router.route('/getOtp')
      .post(sendOtp)
router.route('/signUp')
      .post(verifyOtpAndSignUp)
router.route('/signIn')
      .post(signIn)
router.route('/authenticate')
      .get(userCheck)      
router.post('/resendOtp',resendOtp)
router.post('/forgotPass',forgotPassOtp)
router.post('/resetPass',resetPass)
router.post('/googleUserDetails',saveGoogleUser)
router.get('/getDepartments/:pageNo',getDepartment)
router.get('/getDoctorsByDepartment/:id',userAuthentication,getDoctorsByDep)
router.get('/getDoctors',userAuthentication,getDoctors)


export default router