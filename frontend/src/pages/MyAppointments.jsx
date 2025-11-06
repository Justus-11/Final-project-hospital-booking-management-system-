import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState(doctors.slice(0, 2))

  // Simulate Pay Online action
  const handlePayOnline = (doctorName) => {
    alert(`Redirecting to payment page for ${doctorName}...`)
  }

  // Cancel appointment action
  const handleCancelAppointment = (doctorName) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel your appointment with ${doctorName}?`)
    if (confirmCancel) {
      const updatedAppointments = appointments.filter(item => item.name !== doctorName)
      setAppointments(updatedAppointments)
      alert(`Appointment with ${doctorName} has been cancelled.`)
    }
  }

  return (
    <div className='my-10'>
      {/* Header */}
      <p className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
        My Appointments
      </p>

      {/* Appointment list */}
      {appointments.length > 0 ? (
        <div className='space-y-6'>
          {appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border border-gray-200 rounded-2xl shadow-sm p-5 bg-white hover:shadow-md transition'
            >
              {/* Doctor image */}
              <div className='flex-shrink-0'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-28 h-28 object-cover rounded-xl border'
                />
              </div>

              {/* Appointment info */}
              <div className='flex-1 text-gray-700'>
                <p className='text-lg font-semibold'>{item.name}</p>
                <p className='text-sm text-blue-500 font-medium'>
                  {item.speciality}
                </p>
                <p className='mt-2 text-sm'>
                  <span className='font-medium text-gray-800'>Address:</span><br />
                  {item.address?.line1}<br />
                  {item.address?.line2}
                </p>
                <p className='mt-2 text-sm'>
                  <span className='font-medium text-gray-800'>Date & Time:</span> 25 July 2024 | 8:30 PM
                </p>
              </div>

              {/* Buttons */}
              <div className='flex flex-col sm:flex-row gap-3'>
                <button
                  onClick={() => handlePayOnline(item.name)}
                  className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                >
                  Pay Online
                </button>
                <button
                  onClick={() => handleCancelAppointment(item.name)}
                  className='px-5 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition'
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 mt-10'>
          You have no active appointments.
        </p>
      )}
    </div>
  )
}

export default MyAppointments
