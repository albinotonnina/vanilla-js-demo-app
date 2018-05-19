const request = require('supertest')
const express = require('express')
const server = require('../../server/index')

describe('Express app', () => {
  const app = express()
  app.use('/', server())

  it('responds to / with a 200 OK', done => {
    request(app)
      .get('/')
      .expect(200, done)
  })

  it('responds to /results/ with a 404 OK', done => {
    request(app)
      .get('/whatever/')
      .expect(404, done)
  })
})
