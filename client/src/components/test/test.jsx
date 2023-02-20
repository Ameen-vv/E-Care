import React, { useState } from "react";
import { CalendarIcon, BellIcon, UserCircleIcon, PencilIcon } from "@heroicons/react/outline";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [calendarEvents, setCalendarEvents] = useState([]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleEventSelect = ({ start, end }) => {
    const title = window.prompt("Enter a title for your event:");
    if (title) {
      setCalendarEvents([...calendarEvents, { start, end, title }]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "edit-profile":
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Edit Profile</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        );
      case "notifications":
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-gray-600">You have no new notifications.</p>
          </div>
        );
      case "appointments":
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Appointments</h3>
            <p className="text-gray-600">You have no upcoming appointments.</p>
          </div>
        );
      case "calendar":
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Calendar</h3>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectEvent={(event) => console.log(event)}
              onSelectSlot={handleEventSelect}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-gray-200 p-4">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gray-400 rounded-full overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Doctor profile" className="w-full h-full object-cover" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-medium">Dr. John Doe</h2>
            <button className="text-blue-500 font-medium hover:text-blue-600">
              <PencilIcon className="w-6 h-6" />
              <span className="ml-2">Change Profile</span>
            </button>
          </div>
        </div>
        <ul className="text-gray-600">
          <li className={`mb-4 cursor-pointer ${activeTab === "edit-profile" ? "text-gray-800 font-medium" : ""}`} onClick={() => handleTabClick("edit-profile")}>
            <UserCircleIcon className="w6 h-6 inline-block mr-2" />
        <span className="inline-block">Edit Profile</span>
      </li>
      <li className={`mb-4 cursor-pointer ${activeTab === "notifications" ? "text-gray-800 font-medium" : ""}`} onClick={() => handleTabClick("notifications")}>
        <BellIcon className="w-6 h-6 inline-block mr-2" />
        <span className="inline-block">Notifications</span>
      </li>
      <li className={`mb-4 cursor-pointer ${activeTab === "appointments" ? "text-gray-800 font-medium" : ""}`} onClick={() => handleTabClick("appointments")}>
        <span className="inline-block">Appointments</span>
      </li>
      <li className={`mb-4 cursor-pointer ${activeTab === "calendar" ? "text-gray-800 font-medium" : ""}`} onClick={() => handleTabClick("calendar")}>
        <CalendarIcon className="w-6 h-6 inline-block mr-2" />
        <span className="inline-block">Calendar</span>
      </li>
    </ul>
  </div>
  <div className="w-full md:w-3/4 p-4">{renderTabContent()}</div>
</div>
)}

export default DoctorProfile