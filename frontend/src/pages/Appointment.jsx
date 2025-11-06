import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  // Generate 7 days of available slots
  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const times = [];
      while (currentDate < endTime) {
        const formatted = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        times.push(formatted);
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push({
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i
        ).toDateString(),
        times,
      });
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white py-10 px-4 md:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text mb-3">
            Book Appointment
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Schedule your session with {docInfo.name}.
          </p>
        </div>

        {/* Doctor Info Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-3xl border border-gray-200 shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-1 bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="verified" className="w-5" />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="mt-2 py-1 px-3 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              {docInfo.experience}
            </button>

            {/* About */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                About
                <img src={assets.info_icon} alt="info" className="w-4" />
              </h3>
              <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-700 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-blue-700 font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Slots Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Select a Day
          </h2>

          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-5 pb-4 no-scrollbar justify-center">
            {docSlots.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSelectedTime("");
                }}
                className={`min-w-[150px] px-5 py-3 rounded-2xl border text-sm font-medium transition-all ${
                  selectedDayIndex === index
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white border-blue-600"
                    : "bg-white border-gray-200 hover:bg-blue-50 text-gray-700"
                }`}
              >
                {day.date}
              </button>
            ))}
          </div>

          {/* Time Slots for Selected Day */}
          {docSlots[selectedDayIndex] && (
            <div className="mt-10 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Select a Time
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {docSlots[selectedDayIndex].times.map((time, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedTime(time)}
                    className={`text-sm px-4 py-2 rounded-full border cursor-pointer transition-all duration-300 ${
                      selectedTime === time
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50 border-gray-200 text-gray-700"
                    }`}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Button */}
          {selectedTime && (
            <div className="text-center mt-10">
              <button
                onClick={() =>
                  alert(
                    `Appointment booked on ${docSlots[selectedDayIndex].date} at ${selectedTime}`
                  )
                }
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Confirm Booking ({selectedTime})
              </button>
            </div>
          )}
        </div>

        {/* Related Doctors */}
        <div className="mt-16">
          <RelatedDoctors
            currentDocId={docId}
            speciality={docInfo.speciality}
          />
        </div>
      </div>
    )
  );
};

export default Appointment;
