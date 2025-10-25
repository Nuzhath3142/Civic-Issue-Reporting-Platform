import React from 'react'

const doctors = [
  {
    name: 'Simra Patel',
    age: 32,
    education: 'MBBS, PhD in Gynacologist',
    experience: '5 Years',
    contact: '+91 7865982345',
    img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop',
  },
  {
    name: 'Ayesha Khan',
    age: 38,
    education: 'MBBS, MD in Obstetrics',
    experience: '10 Years',
    contact: '+91 9876543210',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop',
  },
  {
    name: 'Priya Sharma',
    age: 29,
    education: 'MBBS, DGO',
    experience: '4 Years',
    contact: '+91 9123456780',
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop', // new working human face photo
  },
  {
    name: 'Dr. Meera Joshi',
    age: 41,
    education: 'MBBS, MS in Gynecology',
    experience: '15 Years',
    contact: '+91 9988776655',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop',
  },
];

function ConsultDoctor() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50">
      <div className="w-full p-8 mx-4 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-12 text-center tracking-tight drop-shadow-lg">Consult A Doctor</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white  p-6 rounded-2xl shadow-md">
              <img
                src={doc.img}
                alt={doc.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-pink-200 shadow-xl mb-4"
              />
              <div className="w-full text-center space-y-2">
                <p className="text-lg font-bold text-pink-700">{doc.name}</p>
                <p className="text-base text-gray-700"><span className="text-pink-600 font-semibold">Age:</span> {doc.age} years</p>
                <p className="text-base text-gray-700"><span className="text-pink-600 font-semibold">Education:</span> {doc.education}</p>
                <p className="text-base text-gray-700"><span className="text-pink-600 font-semibold">Experience:</span> {doc.experience}</p>
                <p className="text-base text-gray-700"><span className="text-pink-600 font-semibold">Contact:</span> {doc.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConsultDoctor 