import express from 'express'
import {  SignIn,doctorSignUp,doctorAuth, sendOtp, resendOtp, rejectedUser, resendApplication } from '../controllers/doctorController.js'
const router = express.Router()


router.post('/getOtp',sendOtp)
router.post('/signUp',doctorSignUp)
router.post('/signIn',SignIn)
router.post('/resendOtp',resendOtp)
router.post('/authenticate',doctorAuth)
router.get('/rejectedUser/:id',rejectedUser)
router.get('/resendForm/:id',resendApplication)

export default router