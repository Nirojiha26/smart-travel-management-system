import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import AboutPage from './pages/AboutPage'
import './styles/App.css'
import './styles/Dashboard.css'

function UserDashboard() {
  return (
    <div>
      <h1>My Travel Dashboard</h1>
      <p>Welcome back! Here are your personalized travel recommendations.</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Your Trips</h3>
        <p>No trips planned yet. Start exploring!</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/home' element={<UserDashboard />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
