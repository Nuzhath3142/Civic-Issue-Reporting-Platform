import React, { createContext, useContext } from 'react';
import axios from 'axios';

// Create the context
const ReportContext = createContext();

// Custom hook for easy access
export const useReport = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const submitReport = async ({ file, symptoms, description }) => {
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('symptoms', symptoms);
      formData.append('description', description);

      // Get user token from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const res = await axios.post(
        `${backendUrl}/user/report-upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After successful submission, fetch updated reports
      if (res.data.success) {
        const updatedReports = await getReports();
        return { ...res.data, updatedReports: updatedReports.reports };
      }
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  const getReports = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      const res = await axios.get(
        `${backendUrl}/user/get-reports`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  return (
    <ReportContext.Provider value={{ submitReport, getReports }}>
      {children}
    </ReportContext.Provider>
  );
};

export { ReportContext }; 