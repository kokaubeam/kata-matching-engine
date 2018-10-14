const app = require('./app')
const request = require('supertest')

describe('App', () => {
  let response
  
  beforeAll(async () => {
    response = await request(app).get('/any')
  })
  
  it('should return 404', () => {
    expect(response.status).toEqual(404)
  })
})
