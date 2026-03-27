import { useState } from 'react'
import './App.css'

function App() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodLog, setMoodLog] = useState([])

  const moods = [
    { emoji: '😊', label: 'Happy', color: '#f1c40f' },
    { emoji: '😢', label: 'Sad', color: '#3498db' },
    { emoji: '😡', label: 'Angry', color: '#e74c3c' },
    { emoji: '😴', label: 'Tired', color: '#95a5a6' },
    { emoji: '😎', label: 'Cool', color: '#2ecc71' },
    { emoji: '😰', label: 'Anxious', color: '#e67e22' }
  ]

  function selectMood(mood) {
    setSelectedMood(mood)

    let now = new Date()
    let time = now.toLocaleTimeString()
    let date = now.toLocaleDateString()

    let entry = {
      emoji: mood.emoji,
      label: mood.label,
      time: time,
      date: date
    }

    setMoodLog([entry, ...moodLog])
  }

  function clearLog() {
    setMoodLog([])
    setSelectedMood(null)
  }

  return (
    <div className="app">
      <h1>Mood Tracker</h1>
      <p className="subtitle">How are you feeling right now?</p>

      <div className="mood-grid">
        {moods.map(function(mood, index) {
          return (
            <button
              key={index}
              className={`mood-btn ${selectedMood && selectedMood.label === mood.label ? 'active' : ''}`}
              onClick={function() { selectMood(mood) }}
              style={selectedMood && selectedMood.label === mood.label ? { backgroundColor: mood.color } : {}}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          )
        })}
      </div>

      {selectedMood && (
        <div className="current-mood" style={{ borderColor: selectedMood.color }}>
          <span className="big-emoji">{selectedMood.emoji}</span>
          <p>You're feeling <strong>{selectedMood.label}</strong></p>
        </div>
      )}

      {moodLog.length > 0 && (
        <div className="mood-log">
          <div className="log-header">
            <h2>Mood History</h2>
            <button onClick={clearLog} className="clear-btn">Clear</button>
          </div>
          {moodLog.map(function(entry, index) {
            return (
              <div key={index} className="log-entry">
                <span>{entry.emoji}</span>
                <span>{entry.label}</span>
                <span className="log-time">{entry.time}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App