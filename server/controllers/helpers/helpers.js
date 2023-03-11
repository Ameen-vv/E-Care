import doctorModel from "../../model/doctorSchema.js";

export const checkSlots = (slots,id)=>{
    return new Promise((resolve,reject)=>{
        console.log('hre');
        let response = {}
        let check
        doctorModel.findOne({_id:id}).then((doctor)=>{
            let slotsArray = doctor.timings
            for(let i = 0;i<slotsArray.length;i++){
                if(slotsArray[i].day === slots.day){
                    if(slotsArray[i].startTime === slots.startTime || slotsArray[i].endTime === slots.endTime){
                        check = true
                        break
                    }else{
                        continue
                    }
                }else{
                    continue
                }
            }
            if(check){
                response.status = false
                resolve(response)
            }else{
                response.status = true
                resolve(response)
            }
        })
    })
}