const http = require('http')
const handleUserRoutes = require('./routes/userRoutes')

const PORT = 3000

const server = http.createServer(function (req, res) {
  // CORS headers so frontend can fetch
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Home route
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'Welcome to Folder Architect API',
      routes: [
        'GET /api/users - Get all users',
        'GET /api/users/:id - Get user by ID'
      ]
    }))
    return
  }

  // Try user routes
  let handled = handleUserRoutes(req, res)

  // 404 if no route matched
  if (!handled) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Route not found' }))
  }
})

server.listen(PORT, function () {
  console.log('Server running at http://localhost:' + PORT)
})
