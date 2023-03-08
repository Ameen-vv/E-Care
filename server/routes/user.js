import express from 'express'
const router = express.Router()
import {forgotPassOtp, getDepartment, resendOtp, resetPass, saveGoogleUser, sendOtp, signIn, userCheck, verifyOtpAndSignUp} from '../controllers/userControllers.js'
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
router.get('/getDepartments',getDepartment)
router.get('/getDoctors',userAuthentication)


export default router