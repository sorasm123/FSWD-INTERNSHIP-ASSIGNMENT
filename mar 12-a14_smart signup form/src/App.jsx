import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    let name = e.target.name
    let value = e.target.value
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  function validateForm() {
    let newErrors = {}

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Must contain an uppercase letter'
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Must contain a number'
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  function getPasswordChecks() {
    let pwd = formData.password
    return [
      { label: '6+ characters', pass: pwd.length >= 6 },
      { label: 'Uppercase letter', pass: /[A-Z]/.test(pwd) },
      { label: 'A number', pass: /[0-9]/.test(pwd) },
      { label: 'Special character', pass: /[^A-Za-z0-9]/.test(pwd) }
    ]
  }

  function getStrengthLevel() {
    let checks = getPasswordChecks()
    let passed = checks.filter(function(c) { return c.pass }).length
    if (formData.password.length === 0) return { level: 0, text: '', color: '' }
    if (passed <= 1) return { level: 1, text: 'Weak', color: '#ef4444' }
    if (passed <= 2) return { level: 2, text: 'Fair', color: '#f59e0b' }
    if (passed <= 3) return { level: 3, text: 'Good', color: '#3b82f6' }
    return { level: 4, text: 'Strong', color: '#10b981' }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(false)

    let validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }
  }

  let strength = getStrengthLevel()
  let checks = getPasswordChecks()

  // pick a face based on form state
  function getFace() {
    if (submitted) return '🎉'
    if (Object.keys(errors).length > 0) return '😬'
    if (strength.level >= 4) return '😎'
    if (strength.level >= 2) return '🤔'
    if (formData.password.length > 0) return '😟'
    if (formData.name.length > 0) return '👋'
    return '😊'
  }

  return (
    <div className="app">
      <div className="signup-card">
        <div className="card-face">{getFace()}</div>
        <h1>Create Account</h1>
        <p className="card-subtitle">Join us! It only takes a minute.</p>

        {submitted && (
          <div className="success-banner">
            <span>🎉</span> Account created! Welcome aboard.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What should we call you?"
              />
            </div>
            {errors.name && <span className="error">⚠ {errors.name}</span>}
          </div>

          <div className="field">
            <label>Email</label>
            <div className="input-wrap">
              <span className="input-icon">📧</span>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <span className="error">⚠ {errors.email}</span>}
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Make it strong!"
              />
              <button
                type="button"
                className="toggle-eye"
                onClick={function() { setShowPassword(!showPassword) }}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <span className="error">⚠ {errors.password}</span>}

            {formData.password.length > 0 && (
              <div className="strength-section">
                <div className="strength-bars">
                  {[1, 2, 3, 4].map(function(i) {
                    return (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{ background: i <= strength.level ? strength.color : '#e5e5e5' }}
                      ></div>
                    )
                  })}
                </div>
                <span className="strength-text" style={{ color: strength.color }}>{strength.text}</span>

                <div className="check-list">
                  {checks.map(function(c) {
                    return (
                      <span key={c.label} className={c.pass ? 'check pass' : 'check fail'}>
                        {c.pass ? '✓' : '✗'} {c.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Type it again"
              />
              {formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password && (
                <span className="match-icon">✓</span>
              )}
            </div>
            {errors.confirmPassword && <span className="error">⚠ {errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Sign Up →
          </button>
        </form>

      </div>
    </div>
  )
}

export default App