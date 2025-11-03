import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import ChartsSection from './components/ChartsSection';
import IssuesSection from './components/IssuesSection';
import PerformanceTable from './components/PerformanceTable';
import MapSection from './components/MapSection';
import Complaints from './components/Complaints';
import Analytics from './components/Analytics';
import Alerts from './components/Alerts';

// Dashboard Component
const Dashboard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <StatsCards />
    <ChartsSection />
    <IssuesSection />
    <PerformanceTable />
    <MapSection />
  </motion.div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/alerts" element={<Alerts />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;