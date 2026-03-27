const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '..', 'data', 'users.json')

function getAllUsers(callback) {
  fs.readFile(dataPath, 'utf-8', function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, JSON.parse(data))
    }
  })
}

function getUserById(id, callback) {
  fs.readFile(dataPath, 'utf-8', function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      let users = JSON.parse(data)
      let user = users.find(function (u) { return u.id === id })
      callback(null, user || null)
    }
  })
}

module.exports = { getAllUsers, getUserById }
