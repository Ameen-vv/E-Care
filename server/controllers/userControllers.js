import userModel from "../model/userSchema.js"
import bcrypt, { hash } from 'bcrypt'
export const userSignUp=async(req,res)=>{
    let user = req.body
    let response
    try{
       const userExist = await userModel.findOne({email:req.body.email})
       if(userExist){
            response.status = false
       }else{
        await bcrypt.hash(req.body.password,10).then((hash)=>{
            user.password = hash

        })
        const newUser = new userModel(user)
        newUser.save()

       }
       res.status(200)
       res.json(response)
       

    }catch(err){
        console.log(err);
    }
}
    
