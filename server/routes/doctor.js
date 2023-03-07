import express from 'express'
import {  SignIn,doctorSignUp,doctorAuth, sendOtp, resendOtp, rejectedUser, resendApplication, getDepartment, getDocDetails, editProfile, timeSlots, deleteSlot } from '../controllers/doctorController.js'
import { doctorAuthentication } from '../middlewares/Authentications.js'
const router = express.Router()


router.post('/getOtp',sendOtp)
router.post('/signUp',doctorSignUp)
router.post('/signIn',SignIn)
router.post('/resendOtp',resendOtp)
router.get('/authenticate',doctorAuth)
router.get('/rejectedUser/:id',rejectedUser)
router.get('/resendForm/:id',resendApplication)
router.get('/getDepartments',getDepartment)
router.get('/getDocDetails',doctorAuthentication,getDocDetails)
router.post('/editProfile/:id',doctorAuthentication,editProfile)
router.post('/editTime/:id',doctorAuthentication,timeSlots)
router.post('/deleteSlot/:id',doctorAuthentication,deleteSlot)

export default router