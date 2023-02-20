import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './DepartmentSection.css'

const departments = [
  {
    name: 'Cardiology',
    image: '/images/cardiology.jpeg',
    doctors: [
      {
        name: 'Dr. John Doe',
        photo: '/images/doctor.jpeg',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at dapibus neque.'
      },
      {
        name: 'Dr. Jane Smith',
        photo: '/images/doctor.jpeg',
        details: 'Nulla facilisi. Nullam in urna a lectus blandit maximus quis ac sapien.'
      }
    ]
  },
  {
    name: 'Dermatology',
    image: '/images/derma.jpeg',
    doctors: [
      {
        name: 'Dr. James Lee',
        photo: '/images/doctor.jpeg',
        details: 'Fusce hendrerit massa non mi suscipit, id dapibus arcu tristique.'
      },
      {
        name: 'Dr. Emily Chen',
        photo: '/images/doctor.jpeg',
        details: 'Pellentesque tincidunt lorem id lacus congue, vel ullamcorper mauris suscipit.'
      }
    ]
  },
  {
    name: 'Neurology',
    image: '/images/neuro.jpeg',
    doctors: [
      {
        name: 'Dr. David Kim',
        photo: '/images/doctor.jpeg',
        details: 'Sed congue tortor vel urna hendrerit, id vulputate mauris malesuada.'
      },
      {
        name: 'Dr. Laura Wong',
        photo: '/images/doctor.jpeg',
        details: 'Vivamus vel dolor eget magna tempus rhoncus sed eget ex.'
      }
    ]
  },{
    name: 'Dermatology',
    image: '/images/derma.jpeg',
    doctors: [
      {
        name: 'Dr. James Lee',
        photo: '/images/doctor.jpeg',
        details: 'Fusce hendrerit massa non mi suscipit, id dapibus arcu tristique.'
      },
      {
        name: 'Dr. Emily Chen',
        photo: '/images/doctor.jpeg',
        details: 'Pellentesque tincidunt lorem id lacus congue, vel ullamcorper mauris suscipit.'
      }
    ]
  },
];

function DepartmentSection()  {
  const Navigate = useNavigate()
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  return (
    <div className="flex flex-wrap justify-center mx-4 text-center">
        <div className='w-full mt-3 mb-3 '><h3 className='department-head'>Our Departments</h3></div>
      {selectedDepartment ? 

            <div className='w-full mt-3 mb-3 '><h3 className='department-name'>{selectedDepartment.name}</h3></div>
      
      :departments.map((department) => (
        <div key={department.name} className="p-4 w-full md:w-1/3 lg:w-1/4 department-card">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" onClick={() => setSelectedDepartment(department)}>
            <img src={department.image} alt={department.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{department.name}</h3>
            </div>
          </div>
        </div>
      ))

      }
      {selectedDepartment && (
        <>
          {/* <div className="p-4 w-full md:w-1/3 lg:w-1/4">
            <button className="bg-white rounded-lg shadow-lg py-2 px-4" onClick={() => setSelectedDepartment(null)}>
              Back to Departments
            </button>
          </div> */}
          {selectedDepartment.doctors.map((doctor) => (
            <div key={doctor.name} className="p-4 w-full md:w-1/2 lg:w-1/3" onClick={()=>Navigate('/doctorView')}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden"/>
              <img src={doctor.photo} alt={doctor.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{doctor.name}</h3>
              <p>{doctor.details}</p>
            </div>
          </div>
      ))}
    </>
  )}
   {selectedDepartment ?  <div className='w-full justify-center' >
<button className='btn btn-success' onClick={()=>setSelectedDepartment(null)}>back</button>
</div>: console.log('set') }  
            

      
</div>

);
};

export default DepartmentSection
