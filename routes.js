const express = require('express')
const router = express.Router()
const matchingEngine = require('./services/matching-engine')

router.get('/book', function(req, res) {
  res.json(matchingEngine.getBook())
})

router.post('/buy', function(req, res) {
  const {qty: quantity, prc: price} = req.body

  matchingEngine.buy(quantity, price)
  
  res.send()
})

router.post('/sell', function(req, res) {
  const {qty: quantity, prc: price} = req.body

  matchingEngine.sell(quantity, price)
  
  res.send()
})

module.exports = router
