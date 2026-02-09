import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../services/authService'

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
      navigate('/')
    } catch (error) {
      toast.error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const renderEmailStep = () => (
    <>
      <section className='heading'>
        <h1>Verify Your Email</h1>
        <p>Enter your email address to receive a verification code</p>
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
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </div>
        </form>
      </section>
    </>
  )

  const renderVerificationStep = () => (
    <>
      <section className='heading'>
        <h1>Enter Verification Code</h1>
        <p>We've sent a 6-digit code to {email}</p>
      </section>

      <section className='form'>
        <form onSubmit={onVerificationSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='verificationCode'
              name='verificationCode'
              value={verificationCode}
              placeholder='Enter 6-digit code'
              onChange={onChange}
              maxLength={6}
              required
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Email'}
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

  const renderRegistrationStep = () => (
    <>
      <section className='heading'>
        <h1>Create Your Account</h1>
        <p>Email verified: {email}</p>
      </section>

      <section className='form'>
        <form onSubmit={onRegistrationSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Email (verified)'
              readOnly
              disabled
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
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
              placeholder='Confirm password'
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </section>
    </>
  )

  if (isLoading) {
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
