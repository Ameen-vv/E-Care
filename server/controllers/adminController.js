import { response } from "express";
import { blockingUser, userDetails , unBlockingUser, gettingDoctors, blockingDoctor, unBlockingDoctor, gettingNewDoctors, approvingDoc, rejectingDoc, adminLogging, addingDepartment, departmentDetails, unListingDepartment, listingDepartment} from "./helpers/adminHelper.js"



export const getUsers = (req,res)=>{
    userDetails().then((response)=>{
        res.status(200).json(response)
        console.log(response,'sdasd');
    }).catch((error)=>{
        console.log(error.message);
    })
}

export const blockUser = (req,res)=>{
    console.log(req.params.id);
    blockingUser(req.params.id).then((response)=>{
        response.status && res.status(200).json(response.status)
    })    
}

export const unBlockUser = (req,res)=>{
    unBlockingUser(req.params.id).then((response)=>{
        response.status && res.status(200).json(response.status)
    })
}

export const getDoctor = (req,res)=>{
    gettingDoctors().then((doctors)=>{
        doctors && res.status(200).json(doctors)
    })
}

export const blockDoctor = (req,res)=>{
    let doctorId = req.params.id
    blockingDoctor(doctorId).then((response)=>{
        response.status && res.status(200).json(response.status)
    })
}

export const unBlockDoctor = (req,res)=>{
    let doctorId = req.params.id
    unBlockingDoctor(doctorId).then((response)=>{
        response.status && res.status(200).json(response.status)
    })
}

export const getNewDoctors = (req,res)=>{
    gettingNewDoctors().then((doctors)=>{
        doctors && res.status(200).json(doctors)
    })
}

export const approveDoctor = (req,res)=>{
    let doctorId = req.params.id
    approvingDoc(doctorId).then((response)=>{
        response.status && res.status(200).json(response.status)
    })

}

export const rejectDoctor = (req,res)=>{
    let doctorId = req.body.doctorId
    let reason = req.body.reject
    rejectingDoc(doctorId,reason).then((response)=>{
        response.status && res.status(200).json(response.status)
    })
}

export const adminLogin = (req,res)=>{
    adminLogging(req.body).then((response)=>{
        res.status(200).json(response)
    })
}

export const addDepartment = (req,res)=>{
    console.log('success');
    addingDepartment(req.body.departmentData,req.body.imageData).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>res.status(500))
}

export const getDepartments = (req,res)=>{
    departmentDetails().then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>res.status(500))
}

export const unlistDepartment = (req,res)=>{
    unListingDepartment(req.params.id).then(()=>{
        res.status(200).json({status:true})
    }).catch((err)=>res.status(500))
}

export const listDepartment = (req,res)=>{
    listingDepartment(req.params.id).then(()=>{
        res.status(200).json({status:true})
    }).catch(()=>res.status(500))
}