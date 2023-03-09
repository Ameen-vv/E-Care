import doctorModel from '../../model/doctorSchema.js'
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken"
import otpGenerator from '../../otpGenerator/otpGenerator.js'
import { generateToken } from '../../jwtAuth/generateJwt.js'
import sendMail from '../../nodeMailer/nodeMailer.js'
import  cloudinary  from '../../utils/cloudinary.js'
import departmentModel from '../../model/departmentModel.js'
import { response } from 'express'
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

export const getDepartmentDetails = ()=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        departmentModel.find({}).then((departments)=>{
            response.departments = departments
            resolve(response)
        }).catch((err)=>reject(err))
    })

}

export const doctorDetails = (token)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                console.log('err');
                reject(err)
            }else{
                doctorModel.findOne({_id:result.doctorId}).populate('department').then((doctor)=>{
                    response.doctor = doctor
                    resolve(response)
                }).catch((err)=>reject(err))
            }  
        })
    })
}

export const editDocProfile = (details,doctorId)=>{
    let response = {}
    console.log('entered');
    return new Promise((resolve,reject)=>{
        doctorModel.findOneAndUpdate({_id:doctorId},{$set:details}).then((doctor)=>{
            doctor ? (response.status = true) : (response.status = false)
            resolve(response)
        }).catch((err)=>console.log(err))
    })
}

export const editTimeSlots = (slots,id)=>{
    let response = {}
    return new Promise((resolve,reject)=>{           
        checkSlots(slots,id).then((check)=>{
            if(check.status){
                doctorModel.findOneAndUpdate({_id:id},{$push:{timings:slots}}).then((doctor)=>{
                    response.status = true
                    resolve(response)
                }).catch((err)=>reject(err))
            }else{
                response.status = false
                resolve(response)
            }
        })
    })
}

const checkSlots = (slots,id)=>{
    return new Promise((resolve,reject)=>{
        let response = {}
        let check
        doctorModel.findOne({_id:id}).then((doctor)=>{
            let slotsArray = doctor.timings
            for(let i = 0;i<slotsArray.length;i++){
                if(slotsArray[i].day === slots.day){
                    if(slotsArray[i].startTime === slots.startTime || slotsArray[i].endTime === slots.endTime){
                        check = true
                        break
                    }else{
                        continue
                    }
                }else{
                    continue
                }
            }
            if(check){
                response.status = false
                resolve(response)
            }else{
                response.status = true
                resolve(response)
            }
        })
    })
}

export const deleteTimeSlot = (data,id)=>{
    let status = {}
    return new Promise((resolve,reject)=>{
        doctorModel.updateOne({_id:id},{$pull:{timings:data}}).then((result)=>{
            result.acknowledged ? status.status = true : status.status = false
            resolve(status)
        }).catch((err)=>console.log(err))
    })
}

export const editDocProfilePic = (image,id)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(image,{upload_preset:'Ecare'}).then((res)=>{
            doctorModel.updateOne({_id:id},{$set:{profilePic:res.secure_url}}).then((result)=>{
                result.acknowledged ? resolve() : reject()
            }).catch((err)=>{
                reject(err)
            })
        }).catch((err)=>{
            reject(err)
        })
    })
}