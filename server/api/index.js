const {Router} = require('express')
const games = require('./games')

const api = () => {
  const api = Router()

  api.use((req, res, next) => {
    res.header('Content-Type', 'application/json')
    next()
  })

  api.use('/games', games())

  return api
}

module.exports = api
