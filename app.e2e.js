const request = require('supertest')
const app = require('./app')

describe('Matching Machine e2e', () => {
  test('Buy and Sell workflow', async () => {
    let response

    await request(app).post('/sell').send({ qty: 10, prc: 15 })
    await request(app).post('/sell').send({ qty: 10, prc: 13 })
    await request(app).post('/buy').send({ qty: 10, prc: 7 })
    await request(app).post('/buy').send({ qty: 10, prc: 9.5 })

    response = await request(app).get('/book')
    expect(response.body).toEqual({
      buys: [ { qty: 10, prc: 9.5 }, { qty: 10, prc: 7 } ],
      sells: [ { qty: 10, prc: 13 },  { qty: 10, prc: 15 } ] 
    })

    await request(app).post('/sell').send({ qty: 5, prc: 9.5 })

    response = await request(app).get('/book')
    expect(response.body).toEqual({
      buys: [ { qty: 5,  prc: 9.5 }, { qty: 10, prc: 7 } ],
      sells: [ { qty: 10, prc: 13 }, { qty: 10, prc: 15 } ] 
    })

    await request(app).post('/buy').send({ qty: 6, prc: 13 })

    response = await request(app).get('/book')
    expect(response.body).toEqual({
      buys: [ { qty: 5,  prc: 9.5 }, { qty: 10, prc: 7 } ],
      sells: [ { qty: 4, prc: 13 }, { qty: 10, prc: 15 } ] 
    })

    await request(app).post('/sell').send({ qty: 7, prc: 7 })

    response = await request(app).get('/book')
    expect(response.body).toEqual({
      buys: [ { qty: 8, prc: 7 } ],
      sells: [ { qty: 4, prc: 13 }, { qty: 10, prc: 15 } ] 
    })

    await request(app).post('/sell').send({ qty: 12, prc: 6 })

    response = await request(app).get('/book')
    expect(response.body).toEqual({
      buys: [],
      sells: [ { qty: 4, prc: 6 }, { qty: 4, prc: 13 }, { qty: 10, prc: 15 } ] 
    })
  })
})
