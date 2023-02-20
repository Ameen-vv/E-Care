import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PhotographIcon, PencilAltIcon, BellIcon, CalendarIcon } from "@heroicons/react/outline";
import './DoctorProfile.css'
const localizer = momentLocalizer(moment);

const DoctorProfile = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [calendarEvents, setCalendarEvents] = useState([]);
    const doctor = {
        name: 'doctor',
        specialty: 'cardiology',
        email: 'doctor@email.com',
        phone: '8623487353',
        education: 'mbbs',
        hospital: 'govt hospital',
        address: 'addresss'
    }

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const [selectedDate, setSelectedDate] = useState("");

    function handleDateChange(event) {
        setSelectedDate(event.target.value);
    }

    const handleEventSelect = ({ start, end }) => {
        const title = prompt("Enter event title:");
        console.log(start);
        console.log(end);
        if (title) {

            setCalendarEvents([...calendarEvents, { start, end, title }]);
        }
    };
    const notifications = [{
        id: 1,
        message: 'this is a notification'
    }, {
        id: 2,
        message: 'this is a notification'
    }, {
        id: 3,
        message: 'this is a notification'
    }]
    const appointments = [{
        id: 1,
        message: 'Theres is an appointment on 12-12-2-23 with patient'
    }]

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className=" " >
                        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                            <div className='text-center w-full department-head mb-4'><h1>Your Details</h1></div>
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h1 className="text-2xl font-medium text-gray-900">
                                            Dr. Jane Smith
                                        </h1>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Cardiologist
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                        <dl className="sm:divide-y sm:divide-gray-200">
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    (555) 555-5555
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    123 Main St, Anytown, USA
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                    do eiusmod tempor incididunt ut labore et dolore magna
                                                    aliqua.
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    MBBS,MS-Ortho
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Experience</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    5 years
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Available Dates</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input
                                                        type="date"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md"
                                                    />
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse ">
                                        <button
                                            type="button"
                                            className=" inline-flex bg-mainColor hover:bg-secColor items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white edit-profile-doctor  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={()=>setActiveTab('edit-profile')}
                                        >
                                            Edit Profile
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "notifications":

                return (
                    notifications.length === 0 ? <div className="flex flex-col items-center">
                        <BellIcon className="h-24 w-24 text-gray-300 mb-4 mt-4" />
                        <p className="text-lg leading-7 text-gray-500">You have no notifications.</p>
                    </div> :
                        <div className="bg-gray-100 p-4 md:max-w-full mx-auto">
                            <h2 className="text-xl font-bold mb-4">Notifications</h2>
                            {notifications.map(notification => (
                                <div className="mb-2 bg-white rounded-lg p-3 flex items-center justify-between" key={notification.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg><p className="text-gray-600 flex-grow">{notification.message}</p>
                                    <button className="text-gray-600 font-bold py-2 px-4 rounded border border-gray-400">Mark as Read</button>
                                </div>
                            ))}
                        </div>
                );
            case "appointments":
                return (
                    appointments.length === 0 ? <div className="flex flex-col items-center">
                        <BellIcon className="h-24 w-24 text-gray-300 mb-4" />
                        <p className="text-lg leading-7 text-gray-500">You have no appointments scheduled.</p>
                    </div> : <div className="bg-gray-100 p-4 md:max-w-full mx-auto">
                        <h2 className="text-xl font-bold mb-4">Your appointments</h2>
                        {appointments.map(appointment => (
                            <div className="mb-2 bg-white rounded-lg p-3 flex items-center justify-between" key={appointment.id}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                <p className="text-gray-600 flex-grow">{appointment.message}</p>
                                <button className="text-gray-600 font-bold py-2 px-4 rounded border border-gray-400">Cancel</button>
                            </div>
                        ))}
                    </div>
                );
            case "calendar":
                return (
                    <div className="w-full">
                        <BigCalendar
                            localizer={localizer}
                            events={calendarEvents}
                            selectable
                            onSelectSlot={handleEventSelect}
                            style={{ height: "80vh" }}
                        />
                    </div>
                );
            case "edit-profile":
                return (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="name" name="name" placeholder="Enter your name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="email" id="email" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="address" name="address" placeholder="Enter your address" />
                            </div>
                            <button className="save-button text-white py-2 px-4 rounded-full  focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )
            default:
                return null;
        }
    };

    return (

        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden ">
            <div className="w-full md:w-1/4 bg-gray-50 p-4 border-r border-gray-200 mb-5">
                <div className="flex flex-col items-center">
                    <img src="/images/doctor.jpeg" alt="Doctor" className="w-32 h-32 rounded-full my-8" />
                    <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-full mb-4">
                        <PencilAltIcon className="h-6 w-6 mr-2" />
                        <span>Edit Profile</span>
                    </button>
                    <h2 className="text-2xl font-semibold mb-2">Dr. John Doe</h2>
                    <span className="text-gray-500 text-lg mb-4">Cardiologist</span>
                    <div className="mt-8">
                        <button
                            className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "profile" ? "active-nav" : "text-gray-600"}`}
                            onClick={() => handleTabClick("profile")}>

                            <PhotographIcon className="h-6 w-6 mr-2" />
                            <span>Profile</span>
                        </button>
                        <button
                            className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "notifications" ? "active-nav" : "text-gray-600"}`}
                            onClick={() => handleTabClick("notifications")}
                        >
                            <BellIcon className="h-6 w-6 mr-2" />
                            <span>Notifications</span>
                        </button>
                        <button
                            className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "appointments" ? "active-nav" : "text-gray-600"}`}
                            onClick={() => handleTabClick("appointments")}
                        >
                            <CalendarIcon className="h-6 w-6 mr-2" />
                            <span>Appointments</span>
                        </button>
                        <button
                            className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "calendar" ? "active-nav" : "text-gray-600"}`}
                            onClick={() => handleTabClick("calendar")}
                        >
                            <CalendarIcon className="h-6 w-6 mr-2" />
                            <span>Calendar</span>
                        </button>
                        <button
                            className={`flex items-center text-lg py-2  px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "edit-profile" ? "active-nav" : "text-gray-600"}`}
                            onClick={() => handleTabClick("edit-profile")}
                        >
                            <PencilAltIcon className="h-6 w-6 mr-2" />
                            <span>Edit Profile</span>
                        </button>
                    </div >
                </div >
            </div  >
            <div className="w-full md:w-3/4 p-4">{renderTabContent()}</div>
        </div >

    );
};

export default DoctorProfile;