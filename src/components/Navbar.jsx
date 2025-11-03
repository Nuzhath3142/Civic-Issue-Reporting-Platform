import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = ({ setSidebarOpen }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'FixMyCity | Department Dashboard';
      case '/complaints': return 'FixMyCity | Citizen Complaints';
      case '/analytics': return 'FixMyCity | Analytics';
      case '/alerts': return 'FixMyCity | Alerts';
      default: return 'FixMyCity | Department Dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Title */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;