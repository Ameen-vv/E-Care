import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const doctorSchema = new Schema({
    fullName:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    dateOfBirth:{
        type:Date
    },
    qualification:{
        type:String
    },
    address:{
        type:String
    },
    hospital:{
        type:String
    },
    password:{
        type:String
    },
    timings:{
        type:[]
    },
    verification:{
        type:String,
        default:'pending'
    },
    department:{
        type:String
    },
    block:{
        type:Boolean,
        default:false
    },
    licenseUrl:{
        type:String
    },
    rejectReason:{
        type:String
    }

})

const doctorModel = mongoose.model('Doctor',doctorSchema)
export default doctorModel