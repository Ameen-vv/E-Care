import express from 'express'
const router = express.Router()
import {resendOtp, sendOtp, signIn, userCheck, verifyOtpAndSignUp} from '../controllers/userControllers.js'

router.route('/getOtp')
      .post(sendOtp)
router.route('/signUp')
      .post(verifyOtpAndSignUp)
router.route('/signIn')
      .post(signIn)
router.route('/authenticate')
      .post(userCheck)
router.post('/resendOtp',resendOtp)      
export default router