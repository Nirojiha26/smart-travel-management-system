import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../services/authService'
import AuthLayout from '../components/AuthLayout'

const STEP_EMAIL = 'email'
const STEP_VERIFICATION = 'verification'
const STEP_REGISTRATION = 'registration'

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(STEP_EMAIL)
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    name: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { email, verificationCode, name, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onEmailSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Email is required')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.sendVerificationCode(email)
      if (response.success) {
        toast.success(response.message)
        setCurrentStep(STEP_VERIFICATION)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Failed to send verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const onVerificationSubmit = async (e) => {
    e.preventDefault()
    
    if (!verificationCode) {
      toast.error('Verification code is required')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.verifyEmail(email, verificationCode)
      if (response.success) {
        toast.success(response.message)
        setCurrentStep(STEP_REGISTRATION)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const onRegistrationSubmit = async (e) => {
    e.preventDefault()
    
    if (!name || !password) {
      toast.error('Name and password are required')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const userData = { name, email, password }
      const response = await authService.register(userData)
      toast.success('Registration successful!')
      navigate('/home')
    } catch (error) {
      toast.error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const renderEmailStep = () => (
    <AuthLayout 
      title="Verify Your Email ID" 
      subtitle="Before registration, please verify your email ID"
    >
      <form onSubmit={onEmailSubmit}>
        <div className="auth-form-group">
          <input
            type="email"
            className="auth-input"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            required
          />
        </div>

        <div className="auth-form-group">
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </div>

        <div className="auth-footer">
          Already have an account?{' '}
          <button 
            type="button" 
            className="auth-link-btn" 
            style={{ fontWeight: 'bold' }}
            onClick={() => navigate('/login')}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  )

  const renderVerificationStep = () => (
    <AuthLayout 
      title="Enter Verification Code" 
      subtitle={`We've sent a 6-digit code to ${email}`}
    >
      <form onSubmit={onVerificationSubmit}>
        <div className="auth-form-group">
          <input
            type="text"
            className="auth-input"
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            placeholder="Enter 6-digit code"
            onChange={onChange}
            maxLength={6}
            required
            style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }}
          />
        </div>

        <div className="auth-form-group">
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </div>

        <div className="auth-footer">
          <button 
            type="button" 
            className="auth-link-btn" 
            onClick={() => setCurrentStep(STEP_EMAIL)}
            disabled={isLoading}
          >
            Back
          </button>
        </div>
      </form>
    </AuthLayout>
  )

  const renderRegistrationStep = () => (
    <AuthLayout 
      title="Create Your Account" 
      subtitle={`Email verified: ${email}`}
    >
      <form onSubmit={onRegistrationSubmit}>
        <div className="auth-form-group">
          <input
            type="text"
            className="auth-input"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
            required
          />
        </div>

        <div className="auth-form-group">
          <input
            type="email"
            className="auth-input"
            id="email"
            name="email"
            value={email}
            placeholder="Email (verified)"
            readOnly
            disabled
            style={{ opacity: 0.7 }}
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
            required
          />
        </div>

        <div className="auth-form-group">
          <input
            type="password"
            className="auth-input"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={onChange}
            required
          />
        </div>

        <div className="auth-form-group">
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  )

  if (isLoading && currentStep === 'loading_state') {
    return <div>Loading...</div>
  }

  return (
    <>
      {currentStep === STEP_EMAIL && renderEmailStep()}
      {currentStep === STEP_VERIFICATION && renderVerificationStep()}
      {currentStep === STEP_REGISTRATION && renderRegistrationStep()}
    </>
  )
}

export default RegisterPage
