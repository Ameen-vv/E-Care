import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDepartments } from '../../redux/Slices/departmetnSlice';
import { fetchDoctors } from '../../redux/Slices/doctorSlice';
import './DepartmentSection.css'

function Test() {
    const departments = useSelector(state=>state.department)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchDepartments())
      },[])
      
  return (<>
       {departments.loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div> } 
      <div className='w-full justify-center flex department-heading mt-5'><h1 className=''>Departments</h1></div>
    <div className='w-full flex justify-center bg-white'>
        <div className="container my-12 mx-auto px-4 md:px-12 lg:w-4/5 sm:w-full  ">
          <div className="flex flex-wrap -mx-1 lg:-mx-4 card-class ">
            {departments.departments.map((Department,index) => (
              <div key={index} className="my-1 px-3 w-full md:w-1/2 lg:my-4 lg:px-3 lg:w-1/3  xl:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
                <article className="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4 w -full">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      className="block h-60 w-60 object-cover"
                      src={Department.imageUrl}
                    />
                  </a>
                  </div>

                  <div className="flex items-center justify-start  leading-tight p-1 md:p-4 self-center">
                    <h1 className="text-lg ms-4">
                      <p className="no-underline department-name ">{Department.name}</p>
                    </h1>
                  </div>

                  <div className="flex items-start  justify-center text-gray-500 text-center leading-tight p-1 md:p-4 flex-col	">
                    <h2 className='mb-1 ms-4 common-head mb-2' >Common Diseases</h2>
                    <ul className='ms-4 common-list'>
                      {
                        Department.commonDiseases.map((disease,index)=>{
                         return <li className='mb-1' >&#x2022; {disease}</li>                       
                        })
                      }
                      
                    </ul>
                  </div>

                  <div className="flex items-center justify-start  leading-tight p-2 md:p-4  mb-3"   >
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                      View Doctors
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"></path>
                      </svg>
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
  )
}

export default Test
