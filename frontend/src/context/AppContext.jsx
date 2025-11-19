import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [patient, setPatient] = useState(() => {
    const saved = localStorage.getItem("patient");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const currencySymbol = "₹";

  // Register patient
  const registerPatient = async (data) => {
    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return { success: false };
    }
  };

  // Login patient
  const loginPatient = async (data) => {
    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, data);
      setPatient(res.data.patient);
      setToken(res.data.token);
      localStorage.setItem("patient", JSON.stringify(res.data.patient));
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return { success: false };
    }
  };

  // Logout
  const logoutPatient = () => {
    setPatient(null);
    setToken(null);
    localStorage.removeItem("patient");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
  };

  // Fetch doctors
  const getDoctorsData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/list`);
      if (res.data.success) setDoctors(res.data.doctors);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error("Server error while fetching doctors.");
    } finally {
      setLoading(false);
    }
  };

  // Book appointment
  const bookAppointment = async ({ docId, slotDate, slotTime }) => {
    if (!token || !patient) {
      toast.warning("You must be logged in to book an appointment.");
      return { success: false, message: "Not logged in" };
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      console.error("Book Appointment Error:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Booking failed" };
    }
  };

  // ================== PAYPAL FUNCTIONS ==================

  // Create PayPal order
  const createPaypalOrder = async (appointmentId) => {
    if (!token) return { success: false, message: "Not logged in" };
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/create-paypal-order`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // Returns { success: true, orderID }
    } catch (err) {
      console.error("Create PayPal Order Error:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to create PayPal order" };
    }
  };

  // Capture PayPal order
  const capturePaypalOrder = async (appointmentId, orderID) => {
    if (!token) return { success: false, message: "Not logged in" };
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/capture-paypal-order`,
        { appointmentId, orderID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // Returns payment result
    } catch (err) {
      console.error("Capture PayPal Order Error:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Payment capture failed" };
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        patient,
        setPatient,
        token,
        doctors,
        loading,
        currencySymbol,
        registerPatient,
        loginPatient,
        logoutPatient,
        getDoctorsData,
        backendUrl,
        bookAppointment,
        createPaypalOrder,
        capturePaypalOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
