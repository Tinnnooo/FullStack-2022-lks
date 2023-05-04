import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  toast: {
    message: null,
    show: false,
  },
  consultations: {},
  vaccinations: {},
  setConsultations: () => {},
  setVaccinations: () => {},
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [vaccinations, setVaccinations] = useState({});
  const [consultations, setConsultations] = useState({});
  const [toast, setToast] = useState({ message: "", show: false, color: "" });

  const showToast = (message, color) => {
    setToast({ message: message, show: true, color: color });
    setTimeout(() => {
      setToast({ message: "", show: false, color: "" });
    }, 3000);
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN", token);
    }
    setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setToken,
        vaccinations,
        setVaccinations,
        consultations,
        setConsultations,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
