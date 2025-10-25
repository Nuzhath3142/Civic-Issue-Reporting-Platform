import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authcontext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/about', label: 'About', icon: 'fas fa-info-circle' },
    { path: '/maternal-approach', label: 'Maternal Approach', icon: 'fas fa-heart' },
    { path: '/video-tutorials', label: 'Video Tutorials', icon: 'fas fa-video' },
    { path: '/exercises', label: 'Exercises', icon: 'fas fa-dumbbell' },
    { path: '/consult-doctor', label: 'Consult Doctor', icon: 'fas fa-user-md' },
    { path: '/pregnancy', label: 'Pregnancy Info', icon: 'fas fa-baby' },
    { path: '/my-reports', label: 'My Reports', icon: 'fas fa-file-medical' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Hamburger Button for mobile only */}
      <button
        className={`fixed ${isMenuOpen ? 'hidden' : 'block'} top-1 left-1 z-50 p-1 px-2 rounded-md bg-white shadow md:hidden focus:outline-none focus:ring-2 focus:ring-pink-400`}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <i className="fas fa-bars text-2xl text-pink-500"></i>
      </button>

      {/* Sidebar: static for md+, slide-in for mobile */}
      <aside
        className={`
          h-screen w-64 bg-pink-50 shadow-lg z-40
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          fixed top-0 left-0
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 bg-pink-100">
          <Link to="/" className="flex items-center gap-2 text-pink-600 font-extrabold text-2xl" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-baby-carriage text-2xl text-pink-400"></i>
            <span className="leading-tight">Mom & Me<br/>Wellness</span>
          </Link>
        </div>
        {/* Nav Links */}
        <nav className="flex flex-col gap-2 mt-6 px-4 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-base font-semibold transition-colors
                ${isActive(link.path)
                  ? 'bg-pink-300 text-white shadow-sm'
                  : 'text-gray-900 hover:bg-pink-200 hover:text-pink-700'}
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className={`${link.icon} text-lg ${isActive(link.path) ? 'text-white' : 'text-gray-700'}`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        {/* Auth/User Section */}
        <div className="flex flex-col gap-3 px-4 pb-6">
          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-400 text-white font-bold shadow hover:bg-pink-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-plus"></i>
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-lg">
                  <i className="fas fa-user"></i>
                </div>
                <span className="font-semibold text-pink-700">{user.name}</span>
              
              </div>
              <span className="font-semibold text-pink-700">{user.email}</span>
              <button
                onClick={() => { signOut(); setIsMenuOpen(false); }}
                className="w-full mt-2 px-4 py-2 rounded-xl bg-pink-100 text-pink-700 font-bold shadow hover:bg-pink-200 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar 