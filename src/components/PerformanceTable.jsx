import React from 'react';
import { motion } from 'framer-motion';

const PerformanceTable = () => {
  const performanceData = [
    {
      region: 'Downtown',
      complaints: 342,
      resolved: 267,
      avgDays: 3.5,
      status: 'average'
    },
    {
      region: 'North District',
      complaints: 278,
      resolved: 235,
      avgDays: 2.8,
      status: 'good'
    },
    {
      region: 'South District',
      complaints: 195,
      resolved: 162,
      avgDays: 4.1,
      status: 'poor'
    },
    {
      region: 'East District',
      complaints: 221,
      resolved: 189,
      avgDays: 3.2,
      status: 'average'
    },
    {
      region: 'West District',
      complaints: 211,
      resolved: 181,
      avgDays: 2.9,
      status: 'good'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      good: 'bg-green-50 text-green-700',
      average: 'bg-yellow-50 text-yellow-700',
      poor: 'bg-red-50 text-red-700'
    };
    
    const labels = {
      good: 'Good',
      average: 'Average',
      poor: 'Needs Attention'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Performance</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Region</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Total Complaints</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Resolved</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg. Resolution Days</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Performance</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((row, index) => (
              <motion.tr
                key={row.region}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 text-gray-900">{row.region}</td>
                <td className="py-3 px-4 text-gray-900">{row.complaints}</td>
                <td className="py-3 px-4 text-gray-900">{row.resolved}</td>
                <td className="py-3 px-4 text-gray-900">{row.avgDays}</td>
                <td className="py-3 px-4">{getStatusBadge(row.status)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PerformanceTable;