import express from 'express'
import {  doctorSignIn, doctorSignUp,doctorAuth } from '../controllers/doctorController.js'
const router = express.Router()

router.post('/signUp',doctorSignUp)
router.post('/signIn',doctorSignIn)
router.post('/authenticate',doctorAuth)
export default router