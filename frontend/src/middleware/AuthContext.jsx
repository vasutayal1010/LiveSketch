import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to check if token is valid
  const isAuthenticated = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now(); // Check if token is expired
    } catch (error) {
      return false; 
    }
  };

  // Login function
//   const login = (jwtToken) => {
//     localStorage.setItem("token", jwtToken);
//     setToken(jwtToken);
//     navigate("/user-profile"); // Redirect after login
//   };

  //Logout function
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setToken(null);
  //   navigate("/login");
  // };

  // useEffect(() => {
  //   if (!isAuthenticated()) logout();
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
