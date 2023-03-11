// import userModel from "../../model/userSchema.js";
// import otpGenerator from "../../otpGenerator/otpGenerator.js";
// import sendMail from "../../nodeMailer/nodeMailer.js";
// import jwt from "jsonwebtoken"
// import { generateToken } from "../../jwtAuth/generateJwt.js";
// import bcrypt, { hash } from 'bcrypt'
// import departmentModel from "../../model/departmentModel.js";
// import doctorModel from "../../model/doctorSchema.js";
// export let otpVerify



// export const sendOtpHelper = (user) => {
//     return new Promise(async (resolve, reject) => {
//         let response = {
//             status: null,
//             otpSent: null
//         }
//         const userExist = await userModel.findOne({ email: user.email })
//         if (userExist) {
//             response.status = false
//         } else {

//             await otpGenerator().then((otp) => {
//                 sendMail(user.email, otp).then((result) => {
//                     if (result.otpSent) {
//                         response.otpSent = true
//                         response.status = true
//                         response.otp = otp
//                         otpVerify = otp
//                     } else {
//                         response.status = false
//                     }
//                 })
//             })


//         }
//         resolve(response)
//     })
// }

// export const SignUp = (user, otp) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         if (otp === otpVerify) {
//             bcrypt.hash(user.password, 10).then((hash) => {
//                 user.password = hash
//                 const newUser = new userModel(user)
//                 newUser.save().then(() => {
//                     response.status = true
//                     resolve(response)
//                 })
//             }).catch((err) => {
//                 reject(err)
//             })
//         } else {
//             response.status = false
//             resolve(response)
//         }
//     })
// }

// export const userSignIn = ({ email, password }) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         userModel.findOne({ email: email }).then((user) => {
//             if (user) {
//                 if (!user.block) {
//                     bcrypt.compare(password, user.password, function (err, result) {
//                         if (result) {
//                             const token = generateToken({ userId: user._id, name: user.fullName, type: 'user' })
//                             response.token = token
//                             response.status = true
//                             resolve(response)
//                         } else {
//                             response.status = false
//                             resolve(response)
//                         }
//                     })
//                 } else {
//                     response.status = false
//                     resolve(response)
//                 }
//             } else {
//                 response.status = false
//                 resolve(response)
//             }
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }


// export const verifyUser = (token) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 userModel.findOne({ _id: result.userId }).then((user) => {
//                     if (user) {
//                         if (user.block) {
//                             response.user = false
//                             resolve(response)
//                         } else {
//                             response.user = true
//                             resolve(response)
//                         }
//                     } else {
//                         response.user = false
//                         resolve(response)
//                     }
//                 }).catch((err) => {
//                     reject(err)
//                 })
//             }
//         })
//     })
// }

// export const resendingOtp = (email) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         otpGenerator().then((otp) => {
//             otpVerify = otp
//             sendMail(email, otp).then((result) => {
//                 if (result.otpSent) {
//                     response.status = true
//                     resolve(response)
//                 } else {
//                     response.status = false
//                     resolve(response)
//                 }
//             })
//         })
//     })
// }

// export const forgotPass = (email) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         userModel.findOne({ email: email }).then((user) => {
//             if (user) {
//                 otpGenerator().then((otp) => {
//                     otpVerify = otp
//                     sendMail(email, otp).then((result) => {
//                         if (result.otpSent) {
//                             response.status = true
//                             resolve(response)
//                         } else {
//                             response.status = false
//                             resolve(response)
//                         }
//                     })
//                 })
//             } else {
//                 response.status = false
//                 resolve(response)
//             }
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }

// export const resettingPass = ({ otp, email, password }) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         if (otp === otpVerify) {
//             bcrypt.hash(password, 10).then((hash) => {
//                 userModel.findOneAndUpdate({ email: email }, { $set: { password: hash } }).then((result) => {
//                     response.status = true
//                     resolve(response)
//                 }).catch((err) => {
//                     reject(err)
//                 })
//             })
//         } else {
//             response.status = false
//             resolve(response)
//         }
//     })
// }

// export const storeGuserDetails = (details) => {
//     let response = {}
//     return new Promise((resolve, reject) => {
//         userModel.findOne({ email: details.email }).then((user) => {
//             if (user) {
//                 if (!user.block) {
//                     const token = generateToken({ userId: user._id, name: user.fullName, type: 'user' })
//                     response.status = true
//                     response.token = token
//                     resolve(response)
//                 } else {
//                     response.status = false
//                     resolve(response)
//                 }
//             } else {
//                 let newUser = new userModel({
//                     fullName: details.displayName,
//                     email: details.email,
//                     phone: details.phoneNumber ?? '',
//                     profilePic: details.photoUrl

//                 })
//                 newUser.save().then((newUser) => {
//                     const token = generateToken({ userId: newUser._id, name: newUser.fullName, type: 'user' })
//                     response.status = true
//                     response.token = token
//                     resolve(response)
//                 }).catch((err) => {
//                     reject(err)
//                 })
//             }
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }

// export const getDepartmentDetails = ()=>{
//     return new Promise((resolve,reject)=>{
//         departmentModel.find({list:true}).then((departments)=>{
//             resolve(departments)
//         }).catch((err)=>reject(err))
//     })
    
// }

// export const getDoctorsByDepartment = (departmentId)=>{
//     return new Promise((resolve,reject)=>{
//         doctorModel.find({block:false,verification:'success',department:departmentId}).then((result)=>{
//            result ? resolve(result) : reject()
//         }).catch((err)=>reject(err))
//     })
// }


// export const getAllDoctors = ()=>{
//     return new Promise((resolve,reject)=>{
//         doctorModel.find({block:false,verification:'success'}).then((doctors)=>{
//             resolve(doctors)
//         }).catch((err)=>reject(err))
//     })
// }