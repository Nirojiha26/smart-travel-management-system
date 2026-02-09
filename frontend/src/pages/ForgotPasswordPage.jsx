import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../services/authService'

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
    <>
      <section className='heading'>
        <h1>Forgot Password</h1>
        <p>Enter your email address to receive a password reset code</p>
      </section>

      <section className='form'>
        <form onSubmit={onEmailSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </div>

          <div className='form-group'>
            <button 
              type='button' 
              className='btn btn-secondary btn-block' 
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Back to Login
            </button>
          </div>
        </form>
      </section>
    </>
  )

  const renderResetStep = () => (
    <>
      <section className='heading'>
        <h1>Reset Password</h1>
        <p>We've sent a 6-digit code to {email}</p>
      </section>

      <section className='form'>
        <form onSubmit={onResetSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              readOnly
              disabled
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='resetCode'
              name='resetCode'
              value={resetCode}
              placeholder='Enter 6-digit reset code'
              onChange={onChange}
              maxLength={6}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='newPassword'
              name='newPassword'
              value={newPassword}
              placeholder='Enter new password'
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm new password'
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>

          <div className='form-group'>
            <button 
              type='button' 
              className='btn btn-secondary btn-block' 
              onClick={() => setCurrentStep(STEP_EMAIL)}
              disabled={isLoading}
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </>
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
