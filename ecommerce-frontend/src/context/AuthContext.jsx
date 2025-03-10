// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the current user's profile to check authentication status
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/profile");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", { email, password });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  // Register function
  const register = async (fullName, email, password) => {
    try {
      const response = await axios.post("http://localhost:8081/api/auth/register", { fullName, email, password });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || "Registration failed" };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/logout");
      setUser(null);
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || "Logout failed" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
