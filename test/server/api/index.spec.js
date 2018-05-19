const request = require('supertest')
const express = require('express')
const api = require('../../../server/api')

describe('Games API', function() {
  let app

  beforeEach(function() {
    app = express()

    app.use('/api', api())
  })

  it('responds to /api/games with a 200 OK', function(done) {
    request(app)
      .get('/api/games')
      .expect(200, done)
      .expect(res => {
        expect(res.body.games.length).toEqual(118)
      })
  })
})
