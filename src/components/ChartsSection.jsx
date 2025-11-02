import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartsSection = () => {
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Issues Reported',
        data: [85, 92, 78, 105, 120, 135, 142, 128, 115, 98, 87, 62],
        backgroundColor: '#0078FF',
        borderColor: '#0078FF',
        borderWidth: 1,
        borderRadius: 5,
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
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutData = {
    labels: ['Resolved', 'Pending'],
    datasets: [
      {
        data: [79, 21],
        backgroundColor: ['#00C48C', '#FF5252'],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Monthly Trends Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Issue Trends</h2>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
        <div className="h-80">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </motion.div>

      {/* Resolution Status Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Resolution Status</h2>
        <div className="h-80">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </motion.div>
    </div>
  );
};

export default ChartsSection;