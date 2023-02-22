import userModel from "../model/userSchema.js"
    import bcrypt, { hash } from 'bcrypt'
import otpGenerator from "../otpGenerator/otpGenerator.js"
import sendMail from "../nodeMailer/nodeMailer.js"
import { generateToken } from "../jwtAuth/generateJwt.js"
import { response } from "express"
import  jwt  from "jsonwebtoken"


let otpVerify


export const sendOtp = async (req, res) => {
    let user = req.body
    console.log(user);
    let response = {
        status: null,
        otpSent: null
    }
    try {
        const userExist = await userModel.findOne({ email: req.body.email })
        if (userExist) {
            response.status = false
        } else {

            await otpGenerator().then((otp) => {
                sendMail(user.email, otp).then((result) => {
                    if (result.otpSent) {
                        response.otpSent = true
                        response.status = true
                        otpVerify = otp
                    } else {
                        response.otpSent = false
                    }
                })
            })


        }
        console.log(response);
        res.status(200)
        res.json(response)


    } catch (err) {
        console.log(err);
    }
}

export const verifyOtpAndSignUp = async (req, res) => {
    try {
        let response = {
            status: null
        }
        let user = req.body.userData
        let otp = req.body.otp
        if (otp === otpVerify) {
            await bcrypt.hash(user.password, 10).then((hash) => {
                user.password = hash

            })
            const newUser = new userModel(user)
            await newUser.save().then(() => {
                response.status = true
                console.log('sigup');
            })
        } else {
            response.status = false
            console.log('failed');
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(404)
        console.log(error);
    }

}

export const signIn = async (req, res) => {
    try {
        let response = {}
        let { email, password } = req.body
        let user = await userModel.findOne({ email: email })

        if (user) {
            if (user.block) {
                    response.block = true
                    res.status(200).json(response)
            } else {
                response.user = true
                response.block = false
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        const token = generateToken({ userId: user._id, name: user.fullName,type:'user' })
                        console.log(token);
                        response.token = token
                        response.password = true
                        res.status(200).json(response)
                    } else {
                        response.password = false
                        res.status(200).json(response)
                    }
                });
            }

        } else {
            response.user = false
            res.status(200).json(response)
        }

    } catch (error) {
        console.log(error);
        res.status(404)
    }

}

export const userCheck =  (req,res)=>{
     try{
        let response = {
            type:'user'
        }
        let token =  req.body.token
        console.log(token);
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, result) => {
           if(err){
            console.log(err);
            response.status = false
            res.json(response)
           }else{
            console.log('success');
              let user =   await userModel.findOne({_id:result.userId})
              if(user){
                if(!user.block){
                    console.log('set');
                    response.user = true
                    response.userName = user.fullName
                    res.status(200).json(response)
                }else{
                    response.user = false
                    res.status(200).json(response)
                }
              }else{
                response.user = false
                res.status(200).json(response)
              }  
           }
          })
     }catch(error){
        console.log(error);
     }

}

export const resendOtp = async(req,res)=>{
    let response = {}
    let email = req.body
    await otpGenerator().then((otp) => {
        sendMail(email, otp).then((result) => {
            if (result.otpSent) {
                response.otpSent = true
                response.status = true
                otpVerify = otp
                res.status(200).json(response)
            } else {
                response.otpSent = false
                response.status = false
                res.status(200).json(response)

            }
        })
    })   
}
