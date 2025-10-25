import React from 'react'
import { useAuth } from '../context/authcontext'


const features = [
  {
    icon: 'fas fa-user-md',
    title: 'Expert Guidance',
    desc: 'Access trusted advice from certified doctors and maternal health experts.'
  },
  {
    icon: 'fas fa-users',
    title: 'Community Support',
    desc: 'Connect with other moms, share experiences, and build lasting friendships.'
  },
  {
    icon: 'fas fa-heart',
    title: 'Personalized Resources',
    desc: 'Get tailored tips, exercises, and nutrition plans for every stage of motherhood.'
  },
  {
    icon: 'fas fa-baby',
    title: 'Child Wellness',
    desc: 'Track your baby’s growth and access resources for healthy development.'
  },
];

function Home() {
const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-white px-4 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center pt-12 pb-10">
        <img
          src="https://cdn4.vectorstock.com/i/1000x1000/67/63/mother-and-baby-icon-stylized-symbol-vector-22656763.jpg"
          alt="mother holding baby"
          className="w-40 h-40 rounded-full border-4 border-pink-200 shadow-xl mb-8 object-cover bg-white"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wider text-pink-700 mb-6 drop-shadow-lg text-center">
          MOM AND ME WELLNESS
        </h1>
        <p className="italic text-xl md:text-2xl text-pink-600 bg-pink-100 rounded-xl px-6 py-3 shadow-md max-w-xl text-center mb-6">
          Support for young moms through care, connection, and guidance.
        </p>

        {
          !user && (
            <a href="/signup" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition mb-2">
            Get Started
          </a>
          )
        }
       
      </div>

      {/* Features Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6 h-full">
            <div className="mb-4 text-pink-500">
              <i className={`${feature.icon} text-4xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-pink-700 mb-2 text-center">{feature.title}</h3>
            <p className="text-base text-gray-700 text-center">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className="w-full max-w-2xl mx-auto bg-pink-100 rounded-2xl shadow-md p-8 flex flex-col items-center">
        <i className="fas fa-quote-left text-3xl text-pink-300 mb-4"></i>
        <p className="text-lg md:text-xl text-gray-700 italic text-center mb-4">
          “Mom & Me Wellness has been a lifesaver! The community and expert advice helped me feel confident and supported throughout my pregnancy and beyond.”
        </p>
        <div className="flex items-center gap-3">
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="testimonial" className="w-12 h-12 rounded-full border-2 border-pink-300" />
          <span className="text-pink-700 font-bold">Aarohi S., New Mom</span>
        </div>
      </div>
    </div>
  )
}

export default Home 