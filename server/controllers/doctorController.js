import doctorModel from "../model/doctorSchema.js";
import bcrypt from 'bcrypt'
import {generateToken} from '../jwtAuth/generateJwt.js'
import  jwt  from "jsonwebtoken"
import { response } from "express";


export const doctorSignUp = async (req, res) => {
    try {
        let doctor = req.body
        let response = {}
        let doctorCheck = await doctorModel.findOne({ email: doctor.email })
        if (doctorCheck) {
            response.status = false
            res.status(200).json(response)
        } else {
            await bcrypt.hash(doctor.password, 10).then((hash) => {
                doctor.password = hash
            })
            let newDoctor = new doctorModel(doctor)
            await newDoctor.save().then(() => {
                response.status = true
                res.status(200).json(response)
            })

        }
    } catch (error) {
        console.log(error);
    }
}

export const doctorSignIn =async (req, res) => {
    try {
        let response = {}
        let {email,password} = req.body
        let doctor =await doctorModel.findOne({ email:email })
        if (doctor) {
            response.user = true
            if(!doctor.block){
                response.block = false
                bcrypt.compare(password,doctor.password,(err,result)=>{
                        if(result){
                            response.password = true
                            if(doctor.verification === "success"){
                                const token = generateToken({doctorId:doctor._id,doctorName:doctor.fullName,type:'doctor'})
                                response.token = token  
                                response.status = 'success'
                                res.status(200).json(response)

                            }else if(doctor.verification === "pending"){
                                response.status = 'pending'
                                res.status(200).json(response)
                            }else{
                                response.status = 'rejected'
                                res.status(200).json(response)
                            }
                        }else{
                            response.password = false
                            res.status(200).json(response)
                        }
                })          
            }else{
                response.block = true
                res.status(200).json(response)
            }

        } else {
            response.user = false
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error);
    }
}

export const doctorAuth = (req,res)=>{
    let token = req.body.DoctorToken
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