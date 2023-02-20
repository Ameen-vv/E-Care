import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [doctor, setDoctor] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [department,setDepartment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const appointment = {
            fullName,
            email,
            phone,
            doctor,
            date,
            time
        };

        // axios.post('/api/appointments', appointment)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));

        // Clear form inputs
        setFullName('');
        setEmail('');
        setPhone('');
        setDoctor('');
        setDate(new Date());
        setTime('');
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <form className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2">
                <h2 className="text-xl font-medium mb-4">Book an Appointment</h2>

                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="doctor" className="block text-gray-700 font-medium mb-2">Department</label>
                    <select
                        id="doctor"
                        value={doctor}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    >
                        <option value="">Select a Department</option>
                        <option value="Dr. John Smith">Cardiology</option>
                        <option value="Dr. Sarah Johnson">Orthology</option>
                        <option value="Dr. David Lee">Oncology</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="doctor" className="block text-gray-700 font-medium mb-2">Doctor</label>
                    <select
                        id="doctor"
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    >
                        <option value="">Select a Doctor</option>
                        <option value="Dr. John Smith">Dr. John Smith</option>
                        <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                        <option value="Dr. David Lee">Dr. David Lee</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
                    <DatePicker
                        id="date"
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        dateFormat="MMMM d, yyyy"
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                    />
                </div>

                <div className="flex justify-center">
                    <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Submit</button>
                </div>
            </form>
        </div>




    )
}

export default AppointmentForm