import axios from 'axios'
import React,{useContext, useRef, useState} from 'react'
import { adminUrl } from '../../../../apiLinks/apiLinks'
import { adminLoading } from '../../../pages/Admin/Home/Home'
import toast, { Toaster } from 'react-hot-toast';

function AddDepartment() {
    const formRef = useRef(null)
    const [department,setDepartment] = useState('')
    const [diseases,setDiseases] = useState('')
    const [image,setImage] = useState('')
    const [err,setErr] = useState(false)
    const [success,setSuccess] = useState(false)
    const [serverErr,setServerErr] = useState(false)
    const {changeLoading} = useContext(adminLoading)
    const departmentData = {
        department,
        diseases
    }
    

    const addDepartment = (e)=>{
        e.preventDefault()
        changeLoading(true)
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () =>{
            let imageData = reader.result
            axios.post(`${adminUrl}addDepartment`,{departmentData,imageData}).then((response)=>{
                response.data.status === 'exist' && toast.error('Department already exists')
                if(response.data.status ==='success'){ 
                    formRef.current.reset()
                    toast.success('Successfully added department')
                }
                response.status != 200 && toast.error('something went wrong try again')
            }).finally(()=>changeLoading(false))
        }
     }

    return (
        <div>
            <Toaster/>
            <form ref={formRef} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={addDepartment} >
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Name</label>
                    <input name='name'  onChange={(e)=>setDepartment(e.target.value)} type="text" placeholder="Cardiology" required className="block w-full px-5 py-3 mt-2 text-black-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Common Diseases</label>
                    <input name='diseases' type="text"  onChange={(e)=>setDiseases(e.target.value)} placeholder="seperate with ," required className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-400">Upload Photo</label>
                    <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])} placeholder="MBBS,MD, etc" className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>


                <button
                    className="flex mt-4 h-3/4 items-center  w-1/4 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span>Add </span>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd" />
                    </svg> */}
                </button>
            </form>
            {
                err && <p className='text-danger mt-3'>department already exists</p>
            }
            {
                serverErr && <p className='text-danger mt-3'>internal server error</p>
            }
            {
                success && <p className='text-success mt-3'>department added</p>
            }
        </div>
    )
}

export default AddDepartment
