import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../store/authSlice'
import AuthLayout from '../components/AuthLayout'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/home')
    }

    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <AuthLayout 
      title="Login" 
      subtitle="Login and start planning your trips"
    >
      <form onSubmit={onSubmit}>
        <div className="auth-form-group">
          <input
            type="email"
            className="auth-input"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>
        <div className="auth-form-group">
          <input
            type="password"
            className="auth-input"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>
        <div className="auth-form-group">
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
        
        <div className="auth-footer" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            type="button" 
            className="auth-link-btn" 
            onClick={() => navigate('/forgot-password')}
            disabled={isLoading}
          >
            Forgot Password?
          </button>

          <button 
            type="button" 
            className="auth-link-btn" 
            onClick={() => navigate('/')}
            disabled={isLoading}
          >
            Back to Home
          </button>
        </div>

        <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <button 
            type="button" 
            className="auth-link-btn" 
            style={{ fontWeight: 'bold' }}
            onClick={() => navigate('/register')}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
