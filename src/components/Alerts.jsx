import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  RefreshCw, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckCircle,
  TrendingUp,
  Building,
  Zap
} from 'lucide-react';

const Alerts = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [alerts, setAlerts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dummy alerts data
  const initialAlerts = [
    {
      id: 1,
      area: 'Old City',
      issueType: 'Major Pothole',
      department: 'Roads',
      description: 'Large pothole causing traffic congestion and vehicle damage',
      timeReported: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      severity: 'critical',
      acknowledged: false,
      coordinates: [17.3850, 78.4867]
    },
    {
      id: 2,
      area: 'Mehdipatnam',
      issueType: 'Power Outage',
      department: 'Electricity',
      description: 'Complete power outage affecting 500+ households',
      timeReported: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      severity: 'critical',
      acknowledged: false,
      coordinates: [17.4000, 78.4500]
    },
    {
      id: 3,
      area: 'Banjara Hills',
      issueType: 'Garbage Overflow',
      department: 'Sanitation',
      description: 'Garbage accumulation due to truck breakdown',
      timeReported: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      severity: 'moderate',
      acknowledged: false,
      coordinates: [17.4250, 78.4400]
    },
    {
      id: 4,
      area: 'Gachibowli',
      issueType: 'Water Pipeline Burst',
      department: 'Water',
      description: 'Major water pipeline burst near tech park',
      timeReported: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      severity: 'critical',
      acknowledged: false,
      coordinates: [17.4400, 78.3500]
    },
    {
      id: 5,
      area: 'Secunderabad',
      issueType: 'Streetlight Failure',
      department: 'Electricity',
      description: 'Multiple streetlights not working on main road',
      timeReported: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      severity: 'low',
      acknowledged: true,
      coordinates: [17.4500, 78.5000]
    }
  ];

  // Summary stats data
  const summaryStats = [
    {
      title: 'Total Active Alerts',
      value: '12',
      change: '+2',
      icon: Bell,
      color: 'blue'
    },
    {
      title: 'Critical Alerts',
      value: '5',
      change: '+1',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Avg Response Time',
      value: '28 min',
      change: '-5 min',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Departments Engaged',
      value: '4',
      change: '',
      icon: Building,
      color: 'purple'
    }
  ];

  const filters = ['All', 'Roads', 'Sanitation', 'Electricity', 'Water'];

  useEffect(() => {
    setAlerts(initialAlerts);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getTimeSince = (date) => {
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const getSeverityConfig = (severity) => {
    const config = {
      critical: {
        color: 'bg-red-100 text-red-800 border-red-200',
        glow: 'shadow-lg shadow-red-200',
        badge: '🔴 Critical',
        flash: true
      },
      moderate: {
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        glow: 'shadow-lg shadow-orange-200',
        badge: '🟠 Moderate',
        flash: false
      },
      low: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        glow: 'shadow-md shadow-blue-200',
        badge: '🔵 Low',
        flash: false
      }
    };
    return config[severity];
  };

  const getDepartmentColor = (department) => {
    const colors = {
      Roads: 'bg-blue-50 text-blue-700 border-blue-200',
      Sanitation: 'bg-green-50 text-green-700 border-green-200',
      Electricity: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Water: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[department] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const filteredAlerts = activeFilter === 'All' 
    ? alerts 
    : alerts.filter(alert => alert.department === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Live Department Alerts</h1>
          </div>
          <p className="text-gray-600 text-lg">Real-time notifications for high-priority issues across the city</p>
        </motion.div>

        {/* Summary Analytics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {summaryStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className={`text-sm font-medium ${
                      stat.change.includes('+') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  stat.color === 'red' ? 'bg-red-50 text-red-600' :
                  stat.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters and Alerts */}
          <div className="lg:col-span-2">
            {/* Filter & Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activeFilter === filter
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
                >
                  <motion.div
                    animate={{ rotate: isRefreshing ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                  Refresh
                </motion.button>
              </div>
            </motion.div>

            {/* Live Alerts Feed */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence>
                {filteredAlerts.map((alert) => {
                  const severityConfig = getSeverityConfig(alert.severity);
                  const departmentColor = getDepartmentColor(alert.department);
                  
                  return (
                    <motion.div
                      key={alert.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={`bg-white rounded-xl border-2 p-6 transition-all duration-300 ${
                        alert.acknowledged 
                          ? 'border-green-200 bg-green-50' 
                          : `${severityConfig.color} ${severityConfig.glow}`
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              {severityConfig.flash && !alert.acknowledged && (
                                <motion.div
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-2 h-2 bg-red-500 rounded-full"
                                />
                              )}
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-900">{alert.area}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${departmentColor}`}>
                              {alert.department}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityConfig.color}`}>
                              {severityConfig.badge}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {alert.issueType}
                          </h3>
                          
                          <p className="text-gray-600 mb-4">
                            {alert.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {getTimeSince(alert.timeReported)}
                              </div>
                            </div>
                            
                            {!alert.acknowledged && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAcknowledge(alert.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Acknowledge
                              </motion.button>
                            )}
                            
                            {alert.acknowledged && (
                              <div className="flex items-center gap-2 text-green-600 font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Acknowledged
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredAlerts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-xl border border-gray-200"
                >
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Alerts</h3>
                  <p className="text-gray-600">All issues are currently being handled</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Alert Locations</h3>
            </div>
            
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Map Preview</p>
                <p className="text-sm text-gray-500">Showing {filteredAlerts.length} active alerts</p>
                
                {/* Simple marker visualization */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {filteredAlerts.map((alert, index) => {
                    const severityConfig = getSeverityConfig(alert.severity);
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-3 h-3 rounded-full ${
                          alert.severity === 'critical' ? 'bg-red-500' :
                          alert.severity === 'moderate' ? 'bg-orange-500' : 'bg-blue-500'
                        } ${severityConfig.flash && !alert.acknowledged ? 'animate-pulse' : ''}`}
                        title={`${alert.area} - ${alert.issueType}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Critical Alerts</span>
                <span className="font-semibold text-red-600">
                  {filteredAlerts.filter(a => a.severity === 'critical' && !a.acknowledged).length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Moderate Alerts</span>
                <span className="font-semibold text-orange-600">
                  {filteredAlerts.filter(a => a.severity === 'moderate' && !a.acknowledged).length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Acknowledged</span>
                <span className="font-semibold text-green-600">
                  {filteredAlerts.filter(a => a.acknowledged).length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;