import doctorModel from '../model/doctorSchema.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import otpGenerator from '../otpGenerator/otpGenerator.js'
import { generateToken } from '../jwtAuth/generateJwt.js'
import sendMail from '../nodeMailer/nodeMailer.js'
import cloudinary from '../utils/cloudinary.js'
import departmentModel from '../model/departmentModel.js'
let verifyOtp
import { checkSlots } from './helpers/helpers.js'


export const sendOtp = (req, res) => {
    try {
        let response = {}
        let email = req.body.doctorEmail
        doctorModel.findOne({ email: email }).then((result) => {
            if (result) {
                response.userExist = true
                res.status(200).json(response)
            } else {
                otpGenerator().then((otp) => {
                    verifyOtp = otp
                    console.log(verifyOtp);
                    sendMail(email, otp).then((mail) => {
                        if (mail.otpSent) {
                            res.status(200).json(response)
                        } else {
                            res.status(500)
                        }
                    })
                })
            }
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const doctorSignUp = (req, res) => {
    try {
        let response = {}
        let doctor = req.body.doctorData
        const otp = req.body.otp
        const image = req.body.imageData
        if (otp === verifyOtp) {
            cloudinary.uploader.upload(image, { upload_preset: 'Ecare' }).then((result) => {
                bcrypt.hash(doctor.password, 10).then((hash) => {
                    doctor.password = hash
                    doctor.licenseUrl = result.secure_url
                    const newDoctor = new doctorModel(doctor)
                    newDoctor.save().then(() => {
                        response.signUp = true
                        res.status(200).json(response)
                    })
                })
            })

        } else {
            res.status(200).json(response)
        }
    }
    catch (err) {
        res.status(500)
    }
}


export const resendOtp = (req, res) => {
    try {
        let response = {}
        let email = req.body.email
        otpGenerator().then((otp) => {
            verifyOtp = otp
            sendMail(email, otp).then((result) => {
                if (result.otpSent) {
                    response.otpSent = true
                    res.status(200).json(response)
                } else {
                    res.status(500)
                }
            })
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const SignIn = (req, res) => {
    try {
        let response = {}
        const { email, password } = req.body
        doctorModel.findOne({ email: email }).then((doctor) => {
            if (doctor) {
                if (!doctor.block) {
                    bcrypt.compare(password, doctor.password, (err, result) => {
                        if (result) {
                            if (doctor.verification === "success") {
                                const token = generateToken({ doctorId: doctor._id, doctorName: doctor.fullName, type: 'doctor' })
                                response.token = token
                                response.status = 'success'
                                res.status(200).json(response)

                            } else if (doctor.verification === "pending") {
                                response.status = 'pending'
                                res.status(200).json(response)
                            } else {
                                response.status = 'rejected'
                                response.id = doctor._id
                                res.status(200).json(response)
                            }
                        } else if (err) {
                            res.status(500)
                        }
                        else {
                            response.status = 'error'
                            res.status(200).json(response)
                        }
                    })
                } else {
                    response.status = 'block'
                    res.status(200).json(response)
                }
            } else {
                response.status = 'noUser'
                res.status(200).json(response)
            }
        })
    }
    catch (err) {
        res.status(500)
    }

}


export const doctorAuth = (req, res) => {
    let token = req.headers.authorization
    try {
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, result) => {
                if (!err) {
                    let user = await doctorModel.findOne({ _id: result.doctorId })
                    if (user) {
                        if (!user.block) {
                            res.status(200).json({ authorization: true })
                        } else {
                            res.status(401).json({ authorization: false })
                        }
                    } else {
                        res.status(401).json({ authorization: false })
                    }
                } else {
                    res.status(401).json({ authorization: false })
                }
            })
        } else {
            res.status(401).json({ authorization: false })
        }
    }
    catch (err) {
        res.status(500)
    }

}


export const rejectedUser = (req, res) => {
    try {
        let doctorId = req.params.id
        let response = {}
        doctorModel.findOne({ _id: doctorId }).then((doctor) => {
            response.details = doctor?.rejectReason
            response.status = true
            res.status(200).json(response)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const resendApplication = (req, res) => {
    try {
        let doctorId = req.params.id
        doctorModel.updateOne({ _id: doctorId }, { $set: { verification: 'pending' } }).then((doctor) => {
            doctor.acknowledged ? res.status(200).json({ status: true }) : res.status(200).json({ status: false })
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const getDepartment = (req, res) => {
    try {
        departmentModel.find({}).then((departments) => {
            res.status(200).json(departments)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const getDocDetails = (req, res) => {
    let token = req.headers.authorization
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if (err) {
                res.status(500)
            } else {
                doctorModel.findOne({ _id: result.doctorId }).populate('department').then((doctor) => {
                    res.status(200).json(doctor)
                })
            }
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const editProfile = (req, res) => {
    try {
        let response = {}
        let details = req.body.doctorData
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if (err) {
                res.status(500)
            } else {
                doctorModel.updateOne({ _id: result.doctorId }, { $set: details }).then((update) => {
                    update.acknowledged ? response.status = true : response.status = false
                    res.status(200).json(response)
                })
            }
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const timeSlots = (req, res) => {
    try {
        let response = {}
        let slots = req.body.timeData
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if (err) {
                res.status(500)
            } else {
                checkSlots(slots, result.doctorId).then((check) => {
                    if (check.status) {
                        doctorModel.updateOne({ _id: result.doctorId }, { $push: { timings: slots } }).then((update) => {
                            update.acknowledged ? response.status = true : response.status = false
                            res.status(200).json(response)
                        })
                    } else {
                        response.status = false
                        res.status(200).json(response)
                    }
                })
            }
        })

    }
    catch (err) {
        res.status(500)
    }
}


export const deleteSlot = (req, res) => {
    try {
        const token = req.headers.authorization
        const data = req.body.data
        let response = {}

        jwt.verify(token, process.env.TOKEN_SECRET, (err, doctor) => {
            if (err) {
                res.status(500)
            } else {
                doctorModel.updateOne({ _id: doctor.doctorId }, { $pull: { timings: data } }).then((result) => {
                    result.acknowledged ? response.status = true : response.status = false
                    res.status(200).json(response)
                })
            }
        })

    }
    catch (err) {
        res.status(500).json({ status: false })
    }

}


export const editProfilePic = (req, res) => {
    try {
        const token = req.headers.authorization
        const image = req.body.imageData
        jwt.verify(token, process.env.TOKEN_SECRET, (err, doctor) => {
            if (err) {
                res.status(500)
            } else {
                cloudinary.uploader.upload(image,{upload_preset:'Ecare'}).then((imageData)=>{
                    doctorModel.updateOne({_id:doctor.doctorId},{$set:{profilePic:imageData.secure_url}}).then((result)=>{
                        result.acknowledged ? res.status(200).json({result:true}) : res.status(500)
                    })
                })
            }
        })
        
    } catch (err) {
        res.status(500)
    }
   
}

