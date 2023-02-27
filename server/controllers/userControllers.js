import userModel from "../model/userSchema.js"
import bcrypt, { hash } from 'bcrypt'
import otpGenerator from "../otpGenerator/otpGenerator.js"
import sendMail from "../nodeMailer/nodeMailer.js"
import { generateToken } from "../jwtAuth/generateJwt.js"
import { response } from "express"
import  jwt, { verify }  from "jsonwebtoken"
import { resendingOtp, sendOtpHelper, SignUp, userSignIn, verifyUser } from "./helpers/userHelper.js"
let otpVerify 





export const sendOtp = async (req, res) => {
    let user = req.body
    sendOtpHelper(user).then((response)=>{
        otpVerify = response.otp
        res.status(200).json(response)
    })
}

export const verifyOtpAndSignUp = async (req, res) => {
    SignUp(req.body.userData,req.body.otp).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
        res.status(500)
    })
}

export const signIn =  (req, res) => {
    userSignIn(req.body).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
        res.status(500)
    })
}

export const userCheck =  (req,res)=>{
    let token =  req.body.token
    !token ? res.status(200).json({user:false}):
    verifyUser(token).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
    })

}

export const resendOtp = async(req,res)=>{
    let email = req.body.email
    console.log(email);
    resendingOtp(email).then((response)=>{
        res.status(200).json(response)
    })
    
}
