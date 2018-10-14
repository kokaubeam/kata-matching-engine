const express = require('express')
const request = require('supertest')
const route = require('./routes')
const matchingEngine = require('./services/matching-engine')

jest.mock('./services/matching-engine')

describe('Routes', () => {
  let app

  beforeAll(() => {
    app = express()
    app.use(route)
  })

  describe('GET /books', () => {
    let response

    const mockGetBookValue = {
      buys: [],
      sells: []
    }
    
    beforeAll(async () => {
      matchingEngine.getBook.mockReturnValue(mockGetBookValue)
      response = await request(app).get('/book')
    })

    afterAll(() => {
      matchingEngine.getBook.mockReset()
    })
    
    it('should return 200', () => {
      expect(response.status).toEqual(200)
    })

    it('should return the current matching engine book', () => {
      expect(response.body).toEqual(mockGetBookValue)
    })
  })
})
