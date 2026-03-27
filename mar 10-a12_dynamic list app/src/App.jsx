import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  function addTask() {
    if (input.trim() === '') {
      alert('Please enter a task!')
      return
    }

    let newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    }

    setTasks([...tasks, newTask])
    setInput('')
  }

  function deleteTask(id) {
    let filtered = tasks.filter(function(task) {
      return task.id !== id
    })
    setTasks(filtered)
  }

  function toggleComplete(id) {
    let updated = tasks.map(function(task) {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updated)
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  let completedCount = tasks.filter(function(t) { return t.completed }).length

  return (
    <div className="app">
      <h1>Task List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={function(e) { setInput(e.target.value) }}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length > 0 && (
        <p className="stats">
          {completedCount} of {tasks.length} tasks completed
        </p>
      )}

      <div className="task-list">
        {tasks.length === 0 && (
          <p className="empty-msg">No tasks yet. Add one above!</p>
        )}

        {tasks.map(function(task) {
          return (
            <div key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={function() { toggleComplete(task.id) }}
              />
              <span className="task-text">{task.text}</span>
              <button className="delete-btn" onClick={function() { deleteTask(task.id) }}>
                Delete
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App