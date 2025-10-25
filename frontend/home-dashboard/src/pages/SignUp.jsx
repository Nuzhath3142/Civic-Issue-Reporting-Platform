import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext'
import { toast } from 'react-toastify'

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() === "" || formData.email.trim() === "") {
      toast.error("Please enter both Name and Gmail ID.");
      return;
    }
    setLoading(true);
    const res = await signUp(formData.name, formData.email, formData.password);
    setLoading(false);
    if (res.success) {
      toast.success("Signup successful!");
      navigate('/pregnancy');
    } else {
      if(res.message == 'User already exists'){
        toast.error('User already exists, Please Login');
        navigate('/login')
      }
      else{
        toast.error(res.message || 'Sign up failed');
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-2">
            <i className="fas fa-baby-carriage fa-2x text-pink-400"></i>
          </div>
          <h1 className="text-3xl font-bold text-pink-700 mb-1">Sign Up</h1>
          <p className="text-gray-500 text-base text-center">Create your account for Mom & Me Wellness</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
              id="name"
              placeholder="Enter your name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Gmail ID</label>
            <input
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
              id="email"
              placeholder="Enter your Gmail ID"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full py-2 rounded-lg bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition-colors text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp 