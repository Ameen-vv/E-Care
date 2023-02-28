import express from 'express'
const router = express.Router()
import {forgotPassOtp, resendOtp, resetPass, saveGoogleUser, sendOtp, signIn, userCheck, verifyOtpAndSignUp} from '../controllers/userControllers.js'

router.route('/getOtp')
      .post(sendOtp)
router.route('/signUp')
      .post(verifyOtpAndSignUp)
router.route('/signIn')
      .post(signIn)
router.route('/authenticate')
      .post(userCheck)
router.post('/resendOtp',resendOtp)
router.post('/forgotPass',forgotPassOtp)
router.post('/resetPass',resetPass)
router.post('/googleUserDetails',saveGoogleUser)      
export default router