import userModel from "../../model/userSchema";
import otpGenerator from "../../otpGenerator/otpGenerator";
import sendMail from "../../nodeMailer/nodeMailer";
import  jwt  from "jsonwebtoken"
import { generateToken } from "../../jwtAuth/generateJwt";
import bcrypt, { hash } from 'bcrypt'


export const sendOtpHelper = ()=>{
    
}