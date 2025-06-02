import { createContext, useContext, useEffect, useState } from "react";
import { setAxiosInstance } from "../api/axiosInstance";

const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  const [backendUrl, setBackendUrl] = useState(localStorage.getItem("backend_url") || "");

  useEffect(() => {
    if (backendUrl) {
      localStorage.setItem("backend_url", backendUrl);
      setAxiosInstance(backendUrl);
    }
  }, [backendUrl]);

  const updateBackendUrl = (url) => setBackendUrl(url);

  return (
    <BackendContext.Provider value={{ backendUrl, updateBackendUrl }}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => useContext(BackendContext);

export const getBackendUrl = () => {
  const fullUrl = localStorage.getItem("backend_url") || "https://default-backend.com";
  
  try {
    const url = new URL(fullUrl);
    url.pathname = "";
    return url.toString().replace(/\/$/, "");
  } catch (err) {
    console.error("Invalid backend URL:", fullUrl, err);
    return "https://default-backend.com";
  }
};