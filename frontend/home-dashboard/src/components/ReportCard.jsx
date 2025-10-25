import React from 'react';

export default function ReportCard({ report, onClose }) {
  if (!report) return null;

  // Determine if the file is an image
  const isImage = report.fileUrl && /\.(jpg|jpeg|png)$/i.test(report.fileUrl);
  const isPdf = report.fileUrl && /\.pdf$/i.test(report.fileUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full relative mx-2 max-h-[95vh] overflow-y-auto border-2 border-pink-200 hide-scrollbar">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <button
          className="absolute top-4 right-6 text-gray-500 hover:text-pink-600 text-3xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-pink-700 mb-8 text-center tracking-tight drop-shadow-lg">Report Details</h2>
        {/* File Preview Section */}
        {report.fileUrl && (
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="mb-2 text-sm text-gray-500 font-medium">File Preview</div>
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center min-h-[120px] max-h-64 w-full max-w-md">
              {isImage ? (
                <img src={report.fileUrl} alt={report.fileName} className="max-h-48 max-w-full rounded shadow" />
              ) : isPdf ? (
                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 underline font-semibold text-lg"
                >
                  View PDF
                </a>
              ) : (
                <span className="text-gray-500">File: <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="underline">{report.fileName}</a></span>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-400">{report.fileName}</div>
          </div>
        )}
        {/* Details Section - stacked vertically */}
        <div className="flex flex-col gap-6 mb-6">
          <div>
            <div className="font-semibold text-pink-600 mb-1">Symptoms</div>
            <div className="block w-full max-h-32 overflow-auto text-gray-800 whitespace-pre-line break-words bg-pink-50 rounded-xl p-4 border border-pink-200 shadow-inner hide-scrollbar">
              {report.symptoms}
            </div>
          </div>
          <div>
            <div className="font-semibold text-pink-600 mb-1">Description</div>
            <div className="block w-full max-h-40 overflow-auto text-gray-800 whitespace-pre-line break-words bg-pink-50 rounded-xl p-4 border border-pink-200 shadow-inner hide-scrollbar">
              {report.description}
            </div>
          </div>
        </div>
        {/* Doctor's Review Section */}
        <div className="mb-6">
          <div className="font-semibold text-pink-600 mb-1 flex items-center gap-2">
            <span>Doctor's Review</span>
            {report.isReviewed ? (
              <span title="Reviewed by doctor" className="text-green-600 text-xl">✔️</span>
            ) : (
              <span title="Pending doctor review" className="text-yellow-500 text-xl">⏳</span>
            )}
          </div>
          <div className="block w-full max-h-32 overflow-auto text-gray-800 whitespace-pre-line break-words bg-pink-50 rounded-xl p-4 border border-pink-200 shadow-inner hide-scrollbar">
            {report.comment ? (
              <span>{report.comment}</span>
            ) : (
              <span className="italic text-gray-400">No review yet</span>
            )}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {report.isReviewed ? 'Reviewed by doctor' : 'Pending doctor review'}
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-400 text-right">
          Uploaded: {new Date(report.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
