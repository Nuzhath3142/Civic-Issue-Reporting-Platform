import React from 'react';
import { motion } from 'framer-motion';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Issues',
      value: '1,247',
      trend: '↑ 12% from last month',
      trendType: 'up'
    },
    {
      title: 'Issues Resolved',
      value: '984',
      trend: '↑ 8% from last month',
      trendType: 'up'
    },
    {
      title: 'Average Resolution Time',
      value: '3.2 days',
      trend: '↓ 0.5 days from last month',
      trendType: 'down'
    },
    {
      title: 'Most Affected Area',
      value: 'Downtown',
      trend: '42 active issues',
      trendType: 'neutral'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={item}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className={`text-sm ${
            stat.trendType === 'up' ? 'text-green-600' : 
            stat.trendType === 'down' ? 'text-red-600' : 
            'text-gray-500'
          }`}>
            {stat.trend}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCards;