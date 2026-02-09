import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../services/authService'
import AuthLayout from '../components/AuthLayout'

const STEP_EMAIL = 'email'
const STEP_RESET = 'reset'

function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(STEP_EMAIL)
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { email, resetCode, newPassword, confirmPassword } = formData

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
      const response = await authService.forgotPassword(email)
      if (response.success) {
        toast.success(response.message)
        setCurrentStep(STEP_RESET)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Failed to send reset code')
    } finally {
      setIsLoading(false)
    }
  }

  const onResetSubmit = async (e) => {
    e.preventDefault()
    
    if (!resetCode || !newPassword) {
      toast.error('Reset code and new password are required')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.resetPassword(email, resetCode, newPassword)
      if (response.success) {
        toast.success(response.message)
        navigate('/login')
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Password reset failed')
    } finally {
      setIsLoading(false)
    }
  }

  const renderEmailStep = () => (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email address to receive a password reset code"
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
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </div>

        <div className="auth-footer">
          <button 
            type="button" 
            className="auth-link-btn" 
            onClick={() => navigate('/login')}
            disabled={isLoading}
          >
            Back to Login
          </button>
        </div>
      </form>
    </AuthLayout>
  )

  const renderResetStep = () => (
    <AuthLayout 
      title="Reset Password" 
      subtitle={`We've sent a 6-digit code to ${email}`}
    >
      <form onSubmit={onResetSubmit}>
        <div className="auth-form-group">
          <input
            type="email"
            className="auth-input"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            readOnly
            disabled
            style={{ opacity: 0.7 }}
          />
        </div>

        <div className="auth-form-group">
          <input
            type="text"
            className="auth-input"
            id="resetCode"
            name="resetCode"
            value={resetCode}
            placeholder="Enter 6-digit reset code"
            onChange={onChange}
            maxLength={6}
            required
            style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }}
          />
        </div>

        <div className="auth-form-group">
          <input
            type="password"
            className="auth-input"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            placeholder="Enter new password"
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
            placeholder="Confirm new password"
            onChange={onChange}
            required
          />
        </div>

        <div className="auth-form-group">
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
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

  if (isLoading && currentStep !== STEP_RESET) {
    return <div>Loading...</div>
  }

  return (
    <>
      {currentStep === STEP_EMAIL && renderEmailStep()}
      {currentStep === STEP_RESET && renderResetStep()}
    </>
  )
}

export default ForgotPasswordPage
