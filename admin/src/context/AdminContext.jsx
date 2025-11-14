import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    if (!aToken) {
      return toast.error("You must be logged in as admin!");
    }

    try {
      // ✅ Correct: token goes in headers, not in POST body
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {}, // POST body can be empty
        {
          headers: {
            Authorization: `Bearer ${aToken}`, // Must include 'Bearer '
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors:", data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
