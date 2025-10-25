import React from 'react'

function Exercises() {
  const yogaPoses = [
    {
      id: 1,
      name: "Cat-Cow Stretch",
      description: "Helps relieve back pain and improves spine flexibility. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Bound Angle Pose",
      description: "Opens up the hips and promotes relaxation. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Child's Pose",
      description: "Relieves tension in the lower back and hips. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Seated Forward Bend",
      description: "Gently stretches the back and hamstrings. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 5,
      name: "Butterfly Pose",
      description: "Improves blood circulation in the pelvic region. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 6,
      name: "Warrior II",
      description: "Builds strength in legs and improves stamina. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 7,
      name: "Side-Lying Savasana",
      description: "Perfect for relaxation and breathing. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 8,
      name: "Legs Up the Wall",
      description: "Reduces swelling in feet and improves circulation. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 9,
      name: "Standing Side Stretch",
      description: "Helps in body alignment and releases tension. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 10,
      name: "Squat Pose",
      description: "Opens the pelvis and strengthens lower body. Hold for 2 minutes.",
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&auto=format&fit=crop&q=60"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white p-6">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-pink-700 mb-12 pt-4 tracking-tight drop-shadow-lg">EXERCISES</h1>

      {/* Yoga Poses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {yogaPoses.map((pose) => (
          <div key={pose.id} className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6">
            <img
              src={pose.image}
              alt={pose.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-pink-200 shadow-lg mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-pink-700 mb-2">{pose.id}. {pose.name}</h3>
            <p className="text-base text-gray-700 font-medium">{pose.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exercises 