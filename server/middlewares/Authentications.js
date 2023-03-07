import doctorModel from "../model/doctorSchema.js"
import  jwt  from "jsonwebtoken"

export const doctorAuthentication = (req,res,next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.status(401).json({authorization:false})
            }else{
                doctorModel.findOne({_id:result.doctorId}).then((doctor)=>{
                    if(doctor){
                        if(doctor.block){
                            res.status(401).json({authorization:false})
                        }else{
                            next()
                        }
                    }else{
                        res.status(401).json({authorization:false})
                    }

                }).catch((err)=>res.status(401).json({authorization:false}))
            }  
        })
    }
    else if(req.body.token){
        let token = req.body.token
        console.log('dsads');
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.status(401).json({authorization:false})
            }else{
                doctorModel.findOne({_id:result.doctorId}).then((doctor)=>{
                    if(doctor){
                        if(doctor.block){
                            res.status(401).json({authorization:false})
                        }else{
                            next()
                        }
                    }else{
                        res.status(401).json({authorization:false})
                    }
                }).catch((err)=>res.status(401).json({authorization:false}))
            }  
        })
    }
    else{
        res.status(401).json({authorization:false})
    }
}