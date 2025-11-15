import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

 const getAllDoctors = async (token = aToken) => {
  if (!token) return;

  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/all-doctors`,
      {}, // empty body for POST
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.success) {
      setDoctors(data.doctors);
      console.log("Doctors fetched:", data.doctors); // ✅ log in console
    } else {
      if (data.message === "Token Invalid or Expired") {
        setAToken("");
        localStorage.removeItem("aToken");
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};



  const value = { aToken, setAToken, doctors, getAllDoctors };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
