// import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../lib/context/AuthContext";
import API from "../../../lib/api";
import useMedicalStaff from "../../../lib/context/stores/useMedicalStaff";


const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // const { user } = useAuth();

  // Sample data - replace with actual API calls
  // const upcomingAppointments = [
  //   {
  //     id: 1,
  //     doctor: 'Dr. Sarah Johnson',
  //     specialty: 'Gynecologist',
  //     date: '2024-04-15',
  //     time: '10:00 AM',
  //     location: 'Main Clinic - Room 204',
  //     status: 'confirmed'
  //   },
  //   {
  //     id: 2,
  //     doctor: 'Dr. Michael Chen',
  //     specialty: 'Obstetrician',
  //     date: '2024-04-20',
  //     time: '2:30 PM',
  //     location: 'Women\'s Health Center',
  //     status: 'pending'
  //   }
  // ];

  // const pastAppointments = [
  //   {
  //     id: 3,
  //     doctor: 'Dr. Sarah Johnson',
  //     specialty: 'Gynecologist',
  //     date: '2024-03-10',
  //     time: '11:30 AM',
  //     location: 'Main Clinic - Room 204',
  //     status: 'completed'
  //   },
  //   {
  //     id: 4,
  //     doctor: 'Dr. Emily Brown',
  //     specialty: 'Gynecologist',
  //     date: '2024-02-25',
  //     time: '3:00 PM',
  //     location: 'Women\'s Health Center',
  //     status: 'completed'
  //   }
  // ];
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { medicalStaff, fetchMedicalStaff } = useMedicalStaff();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      try {
        const response = await API.get(
          `appointments/v1/appointments?patient=${user.id}`
        );
        const data = response.data.results;
        // console.log(data);

        // You might want to separate upcoming and past appointments
        const now = new Date();
        const upcoming = data.filter((apt) => new Date(apt.start_time) >= now);
        const past = data.filter((apt) => new Date(apt.start_time) < now);

        // console.log(upcoming, past);

        setAppointments({ upcoming, past });
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    fetchMedicalStaff();
  }, [fetchMedicalStaff, user]);

  const getDoctorName = (id) => {
    const doctor = medicalStaff.find((doc) => doc.id === id);
    return doctor ? `${doctor.first_name} ${doctor.last_name}` : "Unknown";
  };




  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
          {getDoctorName(appointment.medical_staff)}
          </h3>
          <p className="text-sm text-gray-600">
            {appointment.specialty || "Gynacologist"}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Date & Time</p>
          <p className="text-sm text-gray-900">
            {new Date(appointment.start_time).toLocaleDateString()} at{" "}
            {new Date(appointment.start_time).toLocaleTimeString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Location</p>
          <p className="text-sm text-gray-900">{appointment.location}</p>
        </div>
      </div>

      {appointment.status !== "completed" && (
        <div className="mt-4 flex space-x-3">
          <button className="text-sm text-pink-600 hover:text-pink-700">
            Reschedule
          </button>
          <button className="text-sm text-red-600 hover:text-red-700">
            Cancel
          </button>
        </div>
      )}
    </div>
  );


  
  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`${
              activeTab === "upcoming"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`${
              activeTab === "past"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Past
          </button>
        </nav>
      </div>
  
      <div className="mt-6">
        {activeTab === "upcoming" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Appointments
              </h2>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                Book New Appointment
              </button>
            </div>
  
            {appointments.upcoming.length > 0 ? (
              appointments.upcoming.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No upcoming appointments found.</p>
                <button className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
                  Book Appointment
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Past Appointments
            </h2>
            {appointments.past.length > 0 ? (
              appointments.past.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No past appointments found.</p>
                <button className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
                  Book Appointment
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
  
};

export default Appointments;
