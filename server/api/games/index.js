const express = require('express')
const dataJson = require('./games.json')
const router = express.Router({mergeParams: true})

const games = () => {
  router.get('/', (req, res) => res.status(200).send(dataJson))

  return router
}

module.exports = games
