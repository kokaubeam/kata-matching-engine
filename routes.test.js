const express = require('express')
const request = require('supertest')
const route = require('./routes')
const matchingEngine = require('./services/matching-engine')
const app = require('./app')

jest.mock('./services/matching-engine')

describe('Routes', () => {
  describe('GET /books', () => {
    let response

    const mockGetBookValue = {
      buys: [{ quantity: 10, price: 5 }],
      sells: [{ quantity: 15, price: 4.5 }]
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
      expect(response.body).toEqual({
        buys: [{ qty: 10, prc: 5 }],
        sells: [{ qty: 15, prc: 4.5 }]
      })
    })
  })

  describe('POST /buy', () => {
    let response

    const mockRequestBody = {
      qty: 10,
      prc: 9.5
    }
    
    beforeAll(async () => {
      response = await request(app)
        .post('/buy')
        .send(mockRequestBody)
    })

    afterAll(() => {
      matchingEngine.buy.mockReset()
    })
    
    it('should return 200', () => {
      expect(response.status).toEqual(200)
    })

    it('should place a buy', () => {
      expect(matchingEngine.buy).toBeCalledWith(mockRequestBody.qty, mockRequestBody.prc)
    })
  })

  describe('POST /sell', () => {
    let response

    const mockRequestBody = {
      qty: 10,
      prc: 9.5
    }
    
    beforeAll(async () => {
      response = await request(app)
        .post('/sell')
        .send(mockRequestBody)
    })

    afterAll(() => {
      matchingEngine.sell.mockReset()
    })
    
    it('should return 200', () => {
      expect(response.status).toEqual(200)
    })

    it('should place a sell', () => {
      expect(matchingEngine.sell).toBeCalledWith(mockRequestBody.qty, mockRequestBody.prc)
    })
  })
})
