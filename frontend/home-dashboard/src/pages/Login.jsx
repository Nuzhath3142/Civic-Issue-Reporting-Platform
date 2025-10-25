import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/authcontext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn(formData.email, formData.password);
    setLoading(false);
    if (res.success) {
      toast.success("Login successful!");
      navigate('/');
    } else {
      toast.error("Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-2">
            <i className="fas fa-baby-carriage fa-2x text-pink-400"></i>
          </div>
          <h1 className="text-3xl font-bold text-pink-700 mb-1">Sign In</h1>
          <p className="text-gray-500 text-base text-center">Welcome back to Mom & Me Wellness</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            />
          </div>
          <div className="flex justify-end mb-2">
            <a href="#" className="text-sm text-pink-500 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition-colors text-lg"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login 