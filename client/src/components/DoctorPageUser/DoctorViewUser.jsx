import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'

function DoctorViewUser() {

  const [selectedDate, setSelectedDate] = useState("");
  const Navigate = useNavigate()

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="flex items-center justify-center bg-gray-50 px-4 py-5 sm:px-6">
            <div className="flex-shrink-0">
              <img
                className="h-30 w-30"
                src="/images/doctor.jpeg"
                alt="Doctor's profile picture"

              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                Dr. John Doe
              </h1>
              <p className="text-sm font-medium leading-5 text-gray-500">
                General Practitioner
              </p>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              About
            </h2>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                odio eget lectus vestibulum congue. Nam vestibulum ex nec erat
                finibus, eu consectetur nibh hendrerit. Praesent imperdiet vel
                nunc ut fringilla. Curabitur ut dolor quis ipsum pulvinar
                sagittis.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Available Dates
              </h3>
              <div className="mt-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Select a date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="form-input block w-full sm:text-sm sm:leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-right">
              <button
                type="button"
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mainColor hover:bg-secColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={()=>Navigate('/book')}
              >
                Book Now
              </button>
              <button
                type="button"
                className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-secColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Message
              </button>
              <button
                type="button"
                className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-secColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Video Call
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorViewUser;
