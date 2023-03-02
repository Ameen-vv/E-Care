import doctorModel from "../model/doctorSchema.js";
import bcrypt from 'bcrypt'
import {generateToken} from '../jwtAuth/generateJwt.js'
import  jwt  from "jsonwebtoken"
import { doctorOtp, doctorSignIn, rejectedDetail, resendingOtp, reSubmit, signingUp } from "./helpers/doctorHelper.js";
import { response } from "express";


export const sendOtp=  (req, res) => {
    doctorOtp(req.body.doctorEmail).then((response)=>{
        res.status(200).json(response)
    })
}
export const doctorSignUp = (req,res)=>{
    signingUp(req.body.doctorData,req.body.otp,req.body.imageData).then((response)=>{
        res.status(200).json(response)
    })
}

export const resendOtp = (req,res)=>{
    resendingOtp(req.body.email).then((response)=>{
        res.status(200).json(response)
    })
}
export const SignIn =async (req, res) => {
    doctorSignIn(req.body).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err)
        res.status(404)
    })
}

export const doctorAuth = (req,res)=>{
    let token = req.body.doctorToken
    console.log(req.body.doctorToken);

    console.log(req.body);
    let response = {}
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET,async(err,result)=>{
            if(!err){
                let user = await  doctorModel.findOne({_id:result.doctorId})
                if(!user.block){
                    response.user = true
                    res.status(200).json(response)
                }else{
                    response.user = false
                    res.status(200).json(response)
                }
            }else{
                response.user = false
                res.status(200).json(response)
            }
        })
    }else{
        response.user = false
        res.status(200).json(response)
        console.log('error');
    }
}

export const rejectedUser = (req,res)=>{
    rejectedDetail(req.params.id).then((response)=>{
        res.status(200).json(response)
    }).catch(()=>res.status(404))
}

export const resendApplication = (req,res)=>{
    reSubmit(req.params.id).then((response)=>{
        res.status(200).json(response)
    }).catch(()=>res.status(404))
}