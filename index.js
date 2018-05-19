const http = require('http')
const express = require('express')
const server = require('./server')
const api = require('./server/api')

const app = express()
app.server = http.createServer(app)

app.use('/api', api())
app.use('/', server())

app.server.listen(process.env.PORT || 5000)
console.log(`Server started on port ${app.server.address().port}`)

module.exports = app
