import doctorModel from '../../model/doctorSchema.js'
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken"
import otpGenerator from '../../otpGenerator/otpGenerator.js'
import { generateToken } from '../../jwtAuth/generateJwt.js'
import sendMail from '../../nodeMailer/nodeMailer.js'
import  cloudinary  from '../../utils/cloudinary.js'
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

export const signingUp = (doctor,otp,image)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
       try{
        if(otp===verifyOtp){
               cloudinary.uploader.upload(image,{upload_preset:'Ecare'}).then((res)=>{
                bcrypt.hash(doctor.password, 10).then((hash)=>{
                    doctor.password = hash
                    doctor.licenseUrl = res.secure_url
                    const newDoctor = new doctorModel(doctor)
                    newDoctor.save().then(()=>{
                        response.status = true
                        resolve(response)
                    })
                })
               }).catch((err)=>{
                reject(err)
            })     
            
        }else{
            response.status = false
            resolve(response)
        }
       }catch(err){
        console.log(err);
       }
    })
}


export const resendingOtp = (email) => {
    let response = {}
    return new Promise((resolve, reject) => {
        otpGenerator().then((otp) => {
            verifyOtp = otp
            sendMail(email, otp).then((result) => {
                if (result.otpSent) {
                    response.status = true
                    resolve(response)
                } else {
                    response.status = false
                    resolve(response)
                }
            })
        })
    })
}

export const doctorSignIn = ({email,password})=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOne({email:email}).then((doctor)=>{
            if(doctor){
                if(!doctor.block){
                    bcrypt.compare(password,doctor.password,(err,result)=>{
                        if(result){
                            if(doctor.verification === "success"){
                                const token = generateToken({doctorId:doctor._id,doctorName:doctor.fullName,type:'doctor'})
                                response.token = token  
                                response.status = 'success'
                                resolve(response)

                            }else if(doctor.verification === "pending"){
                                response.status = 'pending'
                                resolve(response)
                            }else{
                                response.status = 'rejected'
                                response.id = doctor._id
                                resolve(response)
                            }
                        }else if(err){
                            reject(err)
                        }
                        else{
                            response.status = 'error'
                            resolve(response)
                        }
                    })
                }
            }else{
                response.status = 'error'
                resolve(response)
            }
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const rejectedDetail = (doctorId)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOne({_id:doctorId}).then((doctor)=>{
          response.details  =   doctor?.rejectReason
          response.status = true
          resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const reSubmit = (doctorId)=>{
    return new Promise((resolve,reject)=>{
        let response = {}
        doctorModel.findOneAndUpdate({_id:doctorId},{$set:{verification:'pending'}}).then((doctor)=>{
            console.log(doctor);
            doctor && (response.status = true)
            resolve(response)
        }
        ).catch((err)=>reject(err))
    })
}