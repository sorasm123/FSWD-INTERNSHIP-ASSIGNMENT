import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

// ========================================
// NAVBAR
// ========================================
function Navbar() {
  const location = useLocation()
  const current = location.pathname

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="logo">Swara.</div>
        <div className="nav-links">
          {links.map(function(link) {
            return (
              <Link
                key={link.to}
                to={link.to}
                className={current === link.to ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// ========================================
// HOME — split layout with sidebar intro
// ========================================
function Home() {
  return (
    <div className="page">
      <div className="home-split">
        <div className="home-left">
          <span className="greeting">Hey there! I'm</span>
          <h1>Swara Shetty M</h1>
          <p>CS student at Global Academy of Technology, building full stack projects during my SuprMentr internship.</p>
          <div className="home-links">
            <Link to="/projects" className="btn btn-primary">See Projects</Link>
            <Link to="/about" className="btn btn-outline">Know More</Link>
          </div>
        </div>
        <div className="home-right">
          <div className="stat-card">
            <span className="stat-num">6+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">8.37</span>
            <span className="stat-label">CGPA</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">5+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">16</span>
            <span className="stat-label">Week Internship</span>
          </div>
        </div>
      </div>

      <div className="home-tech-strip">
        <span className="strip-title">Currently learning:</span>
        {['React', 'Node.js', 'Express', 'MongoDB'].map(function(t) {
          return <span key={t} className="strip-tag">{t}</span>
        })}
      </div>
    </div>
  )
}

// ========================================
// ABOUT — timeline style, no progress bars
// ========================================
function About() {
  return (
    <div className="page">
      <h1 className="page-title">About Me</h1>

      <div className="about-bio-card">
        <div className="bio-avatar">👩‍💻</div>
        <div className="bio-text">
          <h2>Swara Shetty M</h2>
          <p className="bio-role">Full Stack Web Dev Intern</p>
          <p>I'm a Computer Science student passionate about building web apps. Currently doing a 16-week MERN stack internship at SuprMentr where I'm turning ideas into working projects.</p>
        </div>
      </div>

      <h2 className="section-heading">My Journey</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <span className="timeline-date">2026</span>
            <h3>SuprMentr FSWD Internship</h3>
            <p>Building full stack projects with React, Node.js, Express and MongoDB</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <span className="timeline-date">2025</span>
            <h3>IoT Waste Management Project</h3>
            <p>Designed a smart sensor-based waste management system with real-time monitoring</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <span className="timeline-date">2024-25</span>
            <h3>Mental Health AI Platform</h3>
            <p>Built a web platform for mental health awareness using AI-based prediction</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <span className="timeline-date">2022</span>
            <h3>Started B.E. in Computer Science</h3>
            <p>Global Academy of Technology, Bengaluru — CGPA: 8.37</p>
          </div>
        </div>
      </div>

      <h2 className="section-heading">Skills I Use</h2>
      <div className="skills-pills">
        {[
          { name: 'Python', level: 'strong' },
          { name: 'JavaScript', level: 'strong' },
          { name: 'React', level: 'learning' },
          { name: 'HTML/CSS', level: 'strong' },
          { name: 'Node.js', level: 'learning' },
          { name: 'Java', level: 'strong' },
          { name: 'C', level: 'strong' },
          { name: 'Git', level: 'learning' },
          { name: 'MongoDB', level: 'learning' }
        ].map(function(s) {
          return (
            <span key={s.name} className={'skill-pill ' + s.level}>
              {s.name}
              <span className="pill-dot"></span>
            </span>
          )
        })}
      </div>
      <div className="skill-legend">
        <span><span className="legend-dot strong"></span> Comfortable</span>
        <span><span className="legend-dot learning"></span> Learning</span>
      </div>
    </div>
  )
}

// ========================================
// PROJECTS — list style, not grid cards
// ========================================
function Projects() {
  const projects = [
    { num: '01', title: 'Resume Page', desc: 'Personal resume built as a single HTML page with styled sections for education, skills, and projects.', tech: 'HTML, CSS' },
    { num: '02', title: 'My First Website', desc: 'Profile webpage with navigation, hero section, skills list, project cards, and contact section.', tech: 'HTML, CSS' },
    { num: '03', title: 'Styled Profile Page', desc: 'Enhanced version of the profile page with colors, fonts, gradients, hover effects, and better spacing.', tech: 'HTML, CSS, Flexbox' },
    { num: '04', title: 'Responsive Hero Page', desc: 'Landing page using Flexbox layout with a device switcher to preview desktop, tablet, and mobile views.', tech: 'HTML, CSS, Flexbox, JS' },
    { num: '05', title: 'Interactive Form', desc: 'Registration form with real-time validation for name, email, phone, and age using DOM manipulation.', tech: 'HTML, CSS, JavaScript' },
    { num: '06', title: 'Student Manager', desc: 'Store student names and marks in objects, calculate averages, add and remove students dynamically.', tech: 'JavaScript, DOM, Arrays' },
    { num: '07', title: 'Weather Dashboard', desc: 'React app that fetches live weather data from Open-Meteo API with loading/error states and city search.', tech: 'React, useEffect, API' },
    { num: '08', title: 'Mood Tracker', desc: 'Select your mood using emojis — the UI updates using state and logs your mood history with timestamps.', tech: 'React, useState' },
    { num: '09', title: 'Dynamic Task List', desc: 'Add, complete and delete tasks with a checkbox toggle, live counter, and Enter key support.', tech: 'React, Hooks' },
    { num: '10', title: 'Smart Signup Form', desc: 'Signup form with email validation, password strength meter, live checklist, and show/hide toggle.', tech: 'React, useState, Regex' },
    { num: '11', title: 'Product Listing UI', desc: 'Mini e-commerce frontend with sidebar filters, search, price sorting, star ratings, and working cart.', tech: 'React, Filter, State' },
    { num: '12', title: 'Hello Server', desc: 'Node.js HTTP server that returns different HTML responses on routes like /about, /time, /greet.', tech: 'Node.js, HTTP module' }
  ]

  return (
    <div className="page">
      <h1 className="page-title">Projects</h1>
      <p className="page-subtitle">Things I've built during my internship</p>

      <div className="project-list">
        {projects.map(function(p) {
          return (
            <div key={p.num} className="project-row">
              <span className="project-num">{p.num}</span>
              <div className="project-details">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="project-tech">{p.tech}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ========================================
// CONTACT — minimal, side by side
// ========================================
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function updateField(field, value) {
    setForm({ ...form, [field]: value })
  }

  function handleSend(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <div className="page">
      <h1 className="page-title">Get in Touch</h1>

      <div className="contact-split">
        <div className="contact-info-side">
          <p>Want to connect? Drop me a message or reach out directly.</p>
          <div className="contact-detail">
            <span className="contact-icon">📧</span>
            <div>
              <strong>Email</strong>
              <p>swarashetty761@gmail.com</p>
            </div>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">📍</span>
            <div>
              <strong>Location</strong>
              <p>Bengaluru, Karnataka</p>
            </div>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">🎓</span>
            <div>
              <strong>College</strong>
              <p>Global Academy of Technology</p>
            </div>
          </div>
        </div>

        <div className="contact-form-side">
          {sent ? (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h3>Sent!</h3>
              <p>Thanks {form.name}, I'll reply soon.</p>
              <button className="btn btn-outline" onClick={function() {
                setSent(false)
                setForm({ name: '', email: '', message: '' })
              }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSend}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" value={form.name}
                  onChange={function(e) { updateField('name', e.target.value) }} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="you@email.com" value={form.email}
                  onChange={function(e) { updateField('email', e.target.value) }} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Write something..." value={form.message}
                  onChange={function(e) { updateField('message', e.target.value) }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ========================================
// 404
// ========================================
function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <h1 className="page-title" style={{ fontSize: '4rem', color: '#e85d04' }}>404</h1>
      <p style={{ marginBottom: '20px' }}>This page doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}

// ========================================
// APP
// ========================================
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
