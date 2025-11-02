import React from 'react';
import { motion } from 'framer-motion';

const IssuesSection = () => {
  const issues = [
    {
      name: 'Potholes',
      icon: '🚧',
      count: '287 reported issues',
      completion: 78,
      color: 'bg-orange-500'
    },
    {
      name: 'Broken Lights',
      icon: '💡',
      count: '156 reported issues',
      completion: 92,
      color: 'bg-blue-500'
    },
    {
      name: 'Garbage Overflow',
      icon: '🗑️',
      count: '203 reported issues',
      completion: 65,
      color: 'bg-green-500'
    },
    {
      name: 'Electric Faults',
      icon: '⚡',
      count: '134 reported issues',
      completion: 88,
      color: 'bg-purple-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Issue Types</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${issue.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {issue.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{issue.name}</h3>
                <p className="text-sm text-gray-600">{issue.count}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{issue.completion}%</div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500" 
                  style={{ width: `${issue.completion}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default IssuesSection;