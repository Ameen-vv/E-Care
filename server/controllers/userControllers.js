import { response } from "express"
import userModel from "../model/userSchema.js";
import otpGenerator from "../otpGenerator/otpGenerator.js";
import sendMail from "../nodeMailer/nodeMailer.js";
import jwt from "jsonwebtoken"
import { generateToken } from "../jwtAuth/generateJwt.js";
import bcrypt, { hash } from 'bcrypt'
import departmentModel from "../model/departmentModel.js";
import doctorModel from "../model/doctorSchema.js";
export let otpVerify



export const sendOtp = async (req, res) => {
    try {
        let user = req.body
        let response = {
            status: null,
            otpSent: null
        }
        const userExist = await userModel.findOne({ email: user.email })
        if (userExist) {
            response.userExist = true
        } else {

            await otpGenerator().then((otp) => {
                sendMail(user.email, otp).then((result) => {
                    if (result.otpSent) {
                        response.userExist = false
                        otpVerify = otp
                    } else {
                        res.status(500)
                    }
                })
            })


        }
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    }

}


export const verifyOtpAndSignUp = (req, res) => {
    try {
        const user = req.body.userData
        const otp = req.body.otp
        let response = {}
        if (otp === otpVerify) {
            bcrypt.hash(user.password, 10).then((hash) => {
                user.password = hash
                const newUser = new userModel(user)
                newUser.save().then(() => {
                    response.status = true
                    res.status(200).json(response)
                })
            })
        } else {
            response.status = false
            res.status(200).json(response)
        }
    } catch (err) {
        res.status(500)
    }
}


export const signIn = (req, res) => {
    try {
        let response = {}
        let { email, password } = req.body
        userModel.findOne({ email: email }).then((user) => {
            if (user) {
                if (!user.block) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result) {
                            const token = generateToken({ userId: user._id, name: user.fullName, type: 'user' })
                            response.token = token
                            response.logIn = true
                            res.status(200).json(response)
                        } else {
                            response.incPass = true
                            res.status(200).json(response)
                        }
                    })
                } else {
                    response.block = true
                    res.status(200).json(response)
                }
            } else {
                response.noUser = true
                res.status(200).json(response)
            }
        })
    } catch (err) {
        res.status(500)
    }
}


export const userCheck = (req, res) => {
    let token = req.headers?.authorization
    try {
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
                if (err) {
                    res.status(401).json({ authorization: false })
                } else {
                    userModel.findOne({ _id: result.userId }).then((user) => {
                        if (user) {
                            if (!user.block) {
                                res.status(200).json({ authorization: true })
                            } else {
                                res.status(401).json({ authorization: false })
                            }
                        } else {
                            res.status(401).json({ authorization: false })
                        }
                    })
                }
            })
        } else {
            res.status(401).json({ authorization: false })
        }
    } catch (err) {
        res.status(401).json({ authorization: false })
    }
}


export const resendOtp = (req, res) => {
    try {
        let email = req.body.email
        let response = {}
        otpGenerator().then((otp) => {
            otpVerify = otp
            sendMail(email, otp).then((result) => {
                if (result.otpSent) {
                    response.status = true
                    res.status(200).json(response)
                } else {
                    response.status = false
                    res.status(200).json(response)
                }
            })
        })
    } catch (err) {
        res.status(500)
    }

}


export const forgotPassOtp = (req, res) => {
    try {
        let email = req.body.email
        let response = {}
        userModel.findOne({ email: email }).then((user) => {
            if (user) {
                otpGenerator().then((otp) => {
                    otpVerify = otp
                    sendMail(email, otp).then((result) => {
                        if (result.otpSent) {
                            response.otpSent = true
                            res.status(200).json(response)
                        } else {
                            res.status(200).json(response)
                        }
                    })
                })
            } else {
                response.userErr = true
                res.status(200).json(response)
            }
        })
    } catch (err) {
        res.status(500)
    }
}


export const resetPass = (req, res) => {
    try {
        const { otp, email, password } = req.body
        if (otp === otpVerify) {
            bcrypt.hash(password, 10).then((hash) => {
                userModel.findOneAndUpdate({ email: email }, { $set: { password: hash } }).then((result) => {
                    res.status(200).json({ reset: true })
                })
            })
        } else {
            res.status(200).json({ reset: false })
        }
    } catch (err) {
        res.status(500)
    }
}

export const saveGoogleUser = (req, res) => {
    try {
        let response = {}
        let details = req.body
        userModel.findOne({ email: details.email }).then((user) => {
            if (user) {
                if (!user.block) {
                    const token = generateToken({ userId: user._id, name: user.fullName, type: 'user' })
                    response.logIn = true
                    response.token = token
                    res.status(200).json(response)
                } else {
                    response.block = true
                    res.status(200).json(response)
                }
            } else {
                let newUser = new userModel({
                    fullName: details.displayName,
                    email: details.email,
                    phone: details.phoneNumber ?? '',
                    profilePic: details.photoUrl
                })
                newUser.save().then((newUser) => {
                    const token = generateToken({ userId: newUser._id, name: newUser.fullName, type: 'user' })
                    response.logIn = true
                    response.token = token
                    res.status(200).json(response)
                })
            }
        })
    } catch (err) {
        res.status(500)
    }
}


export const getDepartment = (req, res) => {
    try {
        departmentModel.find({ list: true }).then((departments) => {
            res.status(200).json(departments)
        })
    } catch (err) {
        res.status(500)
    }
}


export const getDoctorsByDep = (req, res) => {
    try {
        doctorModel.find({ block: false, verification: 'success', department: departmentId }).then((result) => {
            result && res.status(200).json(result) 
        })
    } catch (err) {
        res.status(500)
    }
}


export const getDoctors = (req, res) => {
    try {
        doctorModel.find({ block: false, verification: 'success' }).then((doctors) => {
            res.status(200).json(doctors)
        })
    } catch (err) {
        res.status(500)
    }
}