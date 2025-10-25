import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKENDURL;

// Create the context
const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({});

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Fetch profile data when user changes
  useEffect(() => {
    if (user && user.token) {
      getProfileData();
    }
  }, [user]);

  const getProfileData = async () => {
    try {
      if (!user || !user.token) {
        return { success: false, message: 'Not authenticated' };
      }
      const res = await axios.get(
        backendUrl + "/auth/getprofiledata",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProfileData(res.data.user);
      return res.data.user;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Sign up function
  const signUp = async (name, email, password) => {
    try {
      const res = await axios.post(backendUrl+"/auth/signup", { name, email, password });
      const data = res.data;
      if (data.success && data.token) {
        const userObj = { name, email, token: data.token };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const res = await axios.post(backendUrl+"/auth/signin", { email, password });
      const data = res.data;
      if (data.success && data.token) {
        const userObj = { name: data.name,email, token: data.token };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      if (!user || !user.token) {
        return { success: false, message: 'Not authenticated' };
      }
      const res = await axios.patch(
        backendUrl + "/auth/updateprofile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Optionally update user state if backend returns updated user info
      getProfileData();
      return res.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Optionally, add signOut
  const signOut = () => {
    setUser(null);
    setProfileData(null)
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{
      user, signIn, signUp, signOut, updateProfile,
      getProfileData, profileData // Expose if needed
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };