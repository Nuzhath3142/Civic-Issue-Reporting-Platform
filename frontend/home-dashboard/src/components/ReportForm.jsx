import React, { useState } from 'react'
import { useReport } from '../context/reportcontext';
import { toast } from 'react-toastify';

export default function ReportForm({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { submitReport } = useReport();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms || !description) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const result = await submitReport({ file, symptoms, description });
      if (result.success) {
        toast.success('Report submitted successfully!');
        setFile(null);
        setSymptoms('');
        setDescription('');
        if (onSuccess && result.updatedReports) onSuccess(result.updatedReports);
        if (onClose) onClose();
      } else {
        toast.error(result.message || 'Failed to submit report.');
      }
    } catch {
      toast.error('An error occurred while submitting the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-1 max-w-lg mx-auto mb-8"
    >
      <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-pink-700 tracking-tight drop-shadow-lg text-center">Upload New Report</h3>
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-700">Report File</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-700">Symptoms</label>
        <input
          type="text"
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
          placeholder="e.g. Fatigue, headache"
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div className="mb-7">
        <label className="block font-semibold mb-2 text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Add any additional notes or context..."
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[80px] bg-white focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <button
        type="submit"
        className="bg-pink-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-pink-700 transition-colors shadow-lg w-full text-lg"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  )
}
