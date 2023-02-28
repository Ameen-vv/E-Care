import doctorModel from '../../model/doctorSchema.js'
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken"
import otpGenerator from '../../otpGenerator/otpGenerator.js'
import sendMail from '../../nodeMailer/nodeMailer.js'
let verifyOtp

export const doctorOtp = (email)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOne({email:email}).then((result)=>{
            if(result){
                response.status = false
                resolve(response)
            }else{
                otpGenerator().then((otp)=>{
                    verifyOtp = otp
                    sendMail(email,otp).then((mail)=>{
                        if(mail.otpSent){
                            response.status = true
                            resolve(response)
                        }else{
                            response.status = false
                        }
                    })
                })
            }
        })
    })
}

export const signingUp = (doctor,otp)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        if(otp===verifyOtp){
            bcrypt.hash(doctor.password, 10).then((hash)=>{
                doctor.password = hash
                const newDoctor = new doctorModel(doctor)
                newDoctor.save().then(()=>{
                    response.status = true
                    resolve(response)
                })
            })
        }else{
            response.status = false
            resolve(response)
        }
    })
} 