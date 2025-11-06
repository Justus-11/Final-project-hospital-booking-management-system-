import { createContext } from "react";
import { doctors } from "../assets/assets"; // or wherever your doctors data is

export const AppContext = createContext(); // ✅ named export

const AppContextProvider = ({ children }) => {
  const currencySymbol = '$'

  const value = {
     doctors,
    currencySymbol
   };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider; // ✅ default export
