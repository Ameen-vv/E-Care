import userModel from "../../model/userSchema.js";
import doctorModel from "../../model/doctorSchema.js";
import adminModel from "../../model/adminSchema.js";
import { generateToken } from "../../jwtAuth/generateJwt.js";
import departmentModel from "../../model/departmentModel.js";
import cloudinary from "../../utils/cloudinary.js";
import { response } from "express";
import jwt from "jsonwebtoken"

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
            departmentModel.updateOne({_id:result.department},{$push:{doctors:result._id}}).then((data)=>{
                data.acknowledged ? response.status = true : response.status = false
                resolve(response)
            })

        })
    })
}

export const rejectingDoc = (id,reason)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        doctorModel.findOneAndUpdate({_id:id},{$set:{verification:'rejected',rejectReason:reason}}).then((result)=>{
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
                    const token = generateToken({  adminId:result._id,email:email ,type:'admin' })
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

export const addingDepartment = (data,image)=>{
    let response = {}
    return new Promise(async(resolve,reject)=>{
        let departmentName =await titleCase(data.department)
        console.log(departmentName);
        departmentModel.findOne({name:departmentName}).then((department)=>{
            if(department){
                response.status = 'exist'
                resolve(response)
            }else{
                cloudinary.uploader.upload(image,{upload_preset:'Ecare'}).then(async(res)=>{
                    console.log('image upl');
                    let diseases =await data.diseases.split(',')
                    console.log(diseases);
                    let newDepartment = new departmentModel({
                        name:departmentName,
                        commonDiseases:diseases,
                        description:data.description,
                        imageUrl:res.secure_url
                    })
                    newDepartment.save().then(()=>{
                        response.status = 'success'
                        resolve(response)
                })
                }).catch((err)=>reject(err))
            }
        }).catch((err)=>reject(err))
    })
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

export const departmentDetails=()=>{
    return new Promise((resolve,reject)=>{
        departmentModel.find().then((deparments)=>{
            resolve(deparments)
        }).catch((err)=>reject(err))
    })
}


export const unListingDepartment = (id)=>{
    return new Promise((resolve,reject)=>{
        departmentModel.findOneAndUpdate({_id:id},{$set:{list:false}}).then((response)=>{
            resolve()
        }).catch((err)=>reject(err))       
    })
}

export const listingDepartment = (id)=>{
    return new Promise((resolve,reject)=>{
        departmentModel.findOneAndUpdate({_id:id},{$set:{list:true}}).then((response)=>{
            resolve()
        }).catch((err)=>reject(err))       
    })   
}

export const verifyAdmin = (token)=>{
    let response = {}
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                reject(err)
            }else{
                adminModel.findOne({_id:result.adminId}).then((admin)=>{
                    admin ? response.status = true : reject(response)
                    resolve(response)
                }).catch((err)=>{
                    reject(err)
                })
            }
        })
    })
}