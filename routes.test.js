const express = require('express')
const request = require('supertest')
const route = require('./routes')

describe('Routes', () => {
  let app

  beforeAll(() => {
    app = express()
    app.use(route)
  })

  describe('GET /books', () => {
    let response
    
    beforeAll(async () => {
      response = await request(app).get('/book')
    })
    
    it('should return 200', () => {
      expect(response.status).toEqual(200)
    })

    it('should return the current matching engine book', () => {
      expect(response.body).toEqual({
        buys: [],
        sells: []
      })
    })
  })
})
