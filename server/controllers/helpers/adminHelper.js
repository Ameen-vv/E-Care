import userModel from "../../model/userSchema.js";
import doctorModel from "../../model/doctorSchema.js";
import adminModel from "../../model/adminSchema.js";
import { generateToken } from "../../jwtAuth/generateJwt.js";

export const userDetails = ()=>{
    return new Promise(async(resolve,reject)=>{
        let users =await userModel.find()
        users ? resolve(users) : reject({message:'cannot get data'})
    })
}
export const blockingUser = (userId)=>{
    return new Promise((resolve,reject)=>{
        let response = {}
        userModel.findOneAndUpdate({_id:userId},{$set:{block:true}}).then((result)=>{
            console.log(result);
            response.status = true
            resolve(response)
        })
    })
}

export const unBlockingUser = (userId)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        userModel.findOneAndUpdate({_id:userId},{$set:{block:false}}).then(()=>{
            response.status = true
            resolve(response)
        })
    })

}

export const gettingDoctors = ()=>{
    return new Promise((resolve,reject)=>{
        doctorModel.find({verification:'success'}).then((result)=>{
            console.log(result);
            resolve(result)
        })
    })
}

export const blockingDoctor = (id)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOneAndUpdate({_id:id},{$set:{block:true}}).then((result)=>{
             response.status = true
             result && resolve(response)
        })
    })
}

export const unBlockingDoctor = (id)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOneAndUpdate({_id:id},{$set:{block:false}}).then((result)=>{
            response.status = true
            result && resolve(response)
        })
    })
}

export const gettingNewDoctors = ()=>{
    return new Promise((resolve,reject)=>{
        doctorModel.find({verification:'pending'}).then((result)=>{
            result && resolve(result)
        })
    })
}

export const approvingDoc = (id)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOneAndUpdate({_id:id},{$set:{verification:'success'}}).then((result)=>{
            response.status = true
            result && resolve(response)
        })
    })
}

export const rejectingDoc = (id)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOneAndUpdate({_id:id},{$set:{verification:'rejected'}}).then((result)=>{
            response.status = true
            result && resolve(response)
        })
    })
}

export const adminLogging = ({email,password})=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        adminModel.findOne({email:email}).then((result)=>{
            if(result){
                if(result.email === email && result.password === password){
                    response.status = true
                    const token = generateToken({  email:email ,type:'admin' })
                    response.token  = token
                    resolve(response)
                }else{
                    response.status = false
                    resolve(response)
                }
            }else{
                response.status = false
                resolve(response)
            }
        })
    })
}