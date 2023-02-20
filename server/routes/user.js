import express from 'express'
const router = express.Router()
import {userSignUp} from '../controllers/userControllers.js'

router.route('/signUp')
      .post(userSignUp)


export default router