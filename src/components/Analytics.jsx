import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Award,
  BarChart3,
  PieChart,
  Building,
  Lightbulb
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [currentInsight, setCurrentInsight] = useState(0);

  // Insights data for cycling
  const insights = [
    {
      icon: '⚡',
      text: 'Potholes remain the top reported issue this quarter.'
    },
    {
      icon: '💡',
      text: 'Electricity complaints resolved 15% faster this month.'
    },
    {
      icon: '🚧',
      text: 'Road department efficiency improved by 8% compared to last month.'
    },
    {
      icon: '🗑️',
      text: 'Garbage complaints decreased by 12% in residential areas.'
    }
  ];

  // Key metrics data
  const metrics = [
    {
      title: 'Total Complaints',
      value: '3,240',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Average Resolution Time',
      value: '3.1 days',
      change: '-0.4 days',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Most Reported Issue',
      value: 'Potholes',
      change: '42% of total',
      trend: 'neutral',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Department Efficiency',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Award,
      color: 'purple'
    }
  ];

  // Department performance data
  const departmentData = [
    {
      department: 'Roads',
      resolved: 250,
      pending: 45,
      avgDays: 3.2,
      efficiency: 84,
      status: 'average'
    },
    {
      department: 'Electricity',
      resolved: 190,
      pending: 25,
      avgDays: 2.8,
      efficiency: 91,
      status: 'good'
    },
    {
      department: 'Sanitation',
      resolved: 210,
      pending: 60,
      avgDays: 3.6,
      efficiency: 78,
      status: 'poor'
    },
    {
      department: 'Water Works',
      resolved: 180,
      pending: 40,
      avgDays: 3.4,
      efficiency: 82,
      status: 'average'
    }
  ];

  // Bar chart data - Monthly Complaints Trend
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Complaints Reported',
        data: [240, 280, 320, 290, 350, 410, 380, 360, 330, 300, 270, 250],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Complaints Trend',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // Doughnut chart data - Issue Type Distribution
  const doughnutData = {
    labels: ['Potholes', 'Streetlights', 'Garbage', 'Electricity'],
    datasets: [
      {
        data: [42, 18, 25, 15],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgb(37, 99, 235)',
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Issue Type Distribution',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    cutout: '60%',
  };

  // Cycle through insights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
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

  const getStatusBadge = (status) => {
    const config = {
      good: { color: 'bg-green-100 text-green-800', label: '🟢 Good' },
      average: { color: 'bg-yellow-100 text-yellow-800', label: '🟡 Average' },
      poor: { color: 'bg-red-100 text-red-800', label: '🔴 Needs Attention' }
    };
    
    const { color, label } = config[status];
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const getMetricColor = (color) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-50',
      green: 'border-green-500 bg-green-50',
      orange: 'border-orange-500 bg-orange-50',
      purple: 'border-purple-500 bg-purple-50'
    };
    return colors[color];
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 
           trend === 'down' ? 'text-red-600' : 
           'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">City Analytics Overview</h1>
          </div>
          <p className="text-gray-600 text-lg">Visual insights into reported issues and department performance</p>
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${getMetricColor(metric.color)} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getMetricColor(metric.color).replace('border-l-4', '').replace('bg-', 'bg-').replace('-50', '-100')}`}>
                  <metric.icon className={`w-6 h-6 ${
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'orange' ? 'text-orange-600' : 'text-purple-600'
                  }`} />
                </div>
              </div>
              <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {metric.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly Complaints Trend</h3>
            </div>
            <div className="h-80">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <PieChart className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Issue Type Distribution</h3>
            </div>
            <div className="h-80">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </motion.div>

        {/* Department Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="flex items-center mb-6">
            <Building className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Resolved</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Pending</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg. Days</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Efficiency</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departmentData.map((dept, index) => (
                  <motion.tr
                    key={dept.department}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                    className="transition-colors duration-200"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{dept.department}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.resolved}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.pending}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.avgDays}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900 mr-2">{dept.efficiency}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              dept.efficiency >= 90 ? 'bg-green-500' :
                              dept.efficiency >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${dept.efficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(dept.status)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-sm text-white"
        >
          <div className="flex items-center mb-4">
            <Lightbulb className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">Quick Insights</h3>
          </div>
          
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-lg"
          >
            <span className="text-2xl mr-3">{insights[currentInsight].icon}</span>
            <span>{insights[currentInsight].text}</span>
          </motion.div>

          {/* Insight indicators */}
          <div className="flex space-x-2 mt-4">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentInsight(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentInsight ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;