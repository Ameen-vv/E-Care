import { forgotPass, resendingOtp, resettingPass, sendOtpHelper, SignUp, storeGuserDetails, userSignIn, verifyUser } from "./helpers/userHelper.js"


export const sendOtp = async (req, res) => {
    let user = req.body
    sendOtpHelper(user).then((response)=>{
        res.status(200).json(response)
    })
}

export const verifyOtpAndSignUp = async (req, res) => {
    SignUp(req.body.userData,req.body.otp).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
        res.status(500)
    })
}

export const signIn =  (req, res) => {
    userSignIn(req.body).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
        res.status(500)
    })
}

export const userCheck =  (req,res)=>{
    let token =  req.body.token
    !token ? res.status(200).json({user:false}):
    verifyUser(token).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
    })

}

export const resendOtp = (req,res)=>{
    let email = req.body.email
    console.log(email);
    resendingOtp(email).then((response)=>{
        res.status(200).json(response)
    })
    
}

export const forgotPassOtp = (req,res)=>{
    let email = req.body.email
    forgotPass(email).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err)
        res.status(404)
    })
}

export const resetPass = (req,res)=>{
    resettingPass(req.body).then((response)=>{
        console.log(response);
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err)
        res.status(404)
    })
}

export const saveGoogleUser = (req,res)=>{
    storeGuserDetails(req.body).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err)
        res.status(404)
    })   
}