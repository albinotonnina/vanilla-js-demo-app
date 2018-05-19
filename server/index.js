const path = require('path')
const express = require('express')

const server = () => {
  const api = express()

  api.use('/', express.static(path.join(__dirname, '../dist')))

  api.get('*', function(req, res) {
    res.status(404).send('Requested page not found')
  })

  return api
}

module.exports = server
