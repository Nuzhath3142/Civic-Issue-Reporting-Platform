import React, { useState, useEffect } from 'react'
import ReportForm from '../components/ReportForm'
import { useAuth } from '../context/authcontext';
import { useReport } from '../context/reportcontext';
import ReportCard from '../components/ReportCard';

export default function MyReports() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const { getReports } = useReport();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const res = await getReports();
      if (res.success) {
        setReports(res.reports);
      } else {
        setReports([]);
      }
      setLoading(false);
    };
    if (user) {
      fetchReports();
    }
  }, [user, getReports]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-white">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100 text-center">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Please log in to view your reports.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-10 pt-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 tracking-tight drop-shadow-lg">My Reports</h2>
        <button
          className="bg-pink-600 text-white font-bold px-4 py-2 rounded hover:bg-pink-700 transition-colors shadow-lg"
          onClick={() => setShowForm(true)}
        >
          + Add Report
        </button>
      </div>
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-pink-200 via-pink-50 to-white mx-3 rounded-lg shadow-lg p-6 relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-2xl font-bold"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <ReportForm onClose={() => setShowForm(false)} onSuccess={updatedReports => setReports(updatedReports)} />
          </div>
        </div>
      )}
      {/* Report Detail Modal */}
      {selectedReport && (
        <ReportCard report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
      {/* Reports List */}
      <div className="space-y-8 max-w-2xl mx-auto">
        {loading ? (
          <div className="text-center text-pink-700 font-semibold text-lg py-10">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold text-lg py-10">No reports found.</div>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="flex flex-col bg-white rounded-2xl shadow-xl p-6 border border-pink-100 cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => setSelectedReport(report)}
            >
              <span className="text-xs text-gray-400 mb-1">Click to view</span>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-pink-600 text-lg">{report.fileName || 'No file uploaded'}</span>
                <span className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mb-1">
                <span className="font-medium text-gray-700">Symptoms: </span>
                <span className="block w-full truncate text-gray-800">{report.symptoms}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description: </span>
                <span className="block w-full truncate text-gray-800">{report.description}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
