const { getAllUsers, getUserById } = require('../controllers/userController')

function handleUserRoutes(req, res) {
  let url = req.url

  // GET /api/users
  if (url === '/api/users') {
    getAllUsers(function (err, users) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Failed to read data' }))
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
      }
    })
    return true
  }

  // GET /api/users/:id
  let match = url.match(/^\/api\/users\/(\d+)$/)
  if (match) {
    let id = Number(match[1])
    getUserById(id, function (err, user) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Failed to read data' }))
      } else if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'User not found' }))
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(user))
      }
    })
    return true
  }

  return false
}

module.exports = handleUserRoutes
