import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MapPin, 
  FileText,
  Upload,
  Send
} from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    issueType: '',
    location: '',
    description: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy data for initial complaints
  const initialComplaints = [
    {
      id: 1,
      issueType: 'Pothole',
      description: 'Large pothole near main road causing traffic issues',
      location: 'Downtown Main Street',
      status: 'pending',
      date: '2024-01-15',
      userName: 'John Doe'
    },
    {
      id: 2,
      issueType: 'Streetlight',
      description: 'Streetlight not working for past 3 days',
      location: 'North District Park',
      status: 'resolved',
      date: '2024-01-14',
      userName: 'Sarah Wilson'
    },
    {
      id: 3,
      issueType: 'Garbage',
      description: 'Garbage overflow from public bin',
      location: 'Central Market Area',
      status: 'escalated',
      date: '2024-01-16',
      userName: 'Mike Johnson'
    },
    {
      id: 4,
      issueType: 'Electricity',
      description: 'Power outage in residential area',
      location: 'East Residential Zone',
      status: 'pending',
      date: '2024-01-16',
      userName: 'Emily Chen'
    },
    {
      id: 5,
      issueType: 'Pothole',
      description: 'Multiple small potholes on service road',
      location: 'West Industrial Area',
      status: 'resolved',
      date: '2024-01-13',
      userName: 'Robert Brown'
    }
  ];

  useEffect(() => {
    setComplaints(initialComplaints);
  }, []);

  const statsCards = [
    {
      title: 'Total Complaints',
      value: complaints.length,
      icon: Users,
      color: 'border-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Complaints',
      value: complaints.filter(c => c.status === 'pending').length,
      icon: Clock,
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Resolved Complaints',
      value: complaints.filter(c => c.status === 'resolved').length,
      icon: CheckCircle,
      color: 'border-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.fullName || !formData.email || !formData.issueType || 
        !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newComplaint = {
      id: complaints.length + 1,
      issueType: formData.issueType,
      description: formData.description,
      location: formData.location,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      userName: formData.fullName
    };

    setComplaints(prev => [newComplaint, ...prev]);
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      issueType: '',
      location: '',
      description: '',
      image: null
    });

    setIsSubmitting(false);
    toast.success('Complaint submitted successfully!');
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
      escalated: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Escalated' }
    };
    
    const { color, icon: Icon, label } = config[status];
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </span>
    );
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Citizen Complaints</h1>
          <p className="text-gray-600">Report and track civic issues in your area</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('border-', 'text-')}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complaint Submission Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit New Complaint</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Type *
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select issue type</option>
                  <option value="Pothole">Pothole</option>
                  <option value="Streetlight">Streetlight</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Electricity">Electricity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter location details"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Describe the issue in detail..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      name="image"
                      onChange={handleInputChange}
                      className="hidden" 
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </motion.button>
            </form>
          </motion.div>

          {/* Complaints Table */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Complaints</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Issue Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {complaints.map((complaint) => (
                    <motion.tr
                      key={complaint.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {complaint.issueType}
                      </td>
                      <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                        {complaint.description}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {complaint.location}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {complaint.date}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {complaints.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No complaints found. Be the first to report an issue!
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;