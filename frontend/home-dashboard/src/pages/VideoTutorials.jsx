import React from 'react'

function VideoTutorials() {
  const videos = [
    {
      id: 1,
      title: "Hindi Language",
      description: "This tutorial is in Hindi to help mothers who are more comfortable in the Hindi language.",
      embedUrl: "https://www.youtube.com/embed/L19CaJq7qVE"
    },
    {
      id: 2,
      title: "Telugu Language",
      description: "This video is in Telugu for Telugu-speaking moms.",
      embedUrl: "https://www.youtube.com/embed/6nZVSZ2-S5w"
    },
    {
      id: 3,
      title: "English Language",
      description: "This English tutorial covers wellness and care for all moms.",
      embedUrl: "https://www.youtube.com/embed/rlfozkCy8jw"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white p-6">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-pink-700 mt-4 mb-12 tracking-tight drop-shadow-lg">Video Tutorials</h1>

      {/* Videos Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="relative w-full pt-[56.25%] bg-white">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 bg-white text-center">
              <p className="text-pink-700 font-bold text-lg">{video.title}</p>
              <p className="text-pink-600 text-base mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoTutorials 