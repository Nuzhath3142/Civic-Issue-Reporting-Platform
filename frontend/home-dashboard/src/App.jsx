import './index.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Pregnancy from './pages/Pregnancy'
import Exercises from './pages/Exercises'
import VideoTutorials from './pages/VideoTutorials'
import ConsultDoctor from './pages/ConsultDoctor'
import MaternalApproach from './pages/MaternalApproach'
import MyReports from './pages/MyReports';


function App() {

  return (
    <Router>
      <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/pregnancy" element={<Pregnancy />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/video-tutorials" element={<VideoTutorials />} />
            <Route path="/consult-doctor" element={<ConsultDoctor />} />
            <Route path="/maternal-approach" element={<MaternalApproach />} />
            <Route path="/my-reports" element={<MyReports />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
