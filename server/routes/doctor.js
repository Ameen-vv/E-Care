import express from 'express'
import {  doctorSignIn,doctorSignUp,doctorAuth, sendOtp } from '../controllers/doctorController.js'
const router = express.Router()


router.post('/getOtp',sendOtp)
router.post('/signUp',doctorSignUp)
router.post('/signIn',doctorSignIn)
router.post('/authenticate',doctorAuth)

export default router