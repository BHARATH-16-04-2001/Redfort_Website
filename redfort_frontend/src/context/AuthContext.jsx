import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // ✅ LOGIN
  const login = async (username, password) => {
    const res = await api.post("auth/login/", {
      username,
      password
    });

    const access = res.data.access;

    localStorage.setItem("token", access);
    setToken(access);
  };

  // ✅ REGISTER
//   const register = async (data) => {
//     await api.post("auth/register/", data);
//   };

 const register = async (formData) => {
  try {
    console.log("Sending register data:", formData);

    const res = await api.post("/auth/register/", formData);

    console.log("Register success:", res.data);

    return res.data;

  } catch (error) {
    console.error("Register API error:", error.response?.data || error);
    throw error;
  }
};


  // ✅ LOGOUT
  const logout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
