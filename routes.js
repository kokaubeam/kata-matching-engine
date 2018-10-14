const express = require('express')
const router = express.Router()
const matchingEngine = require('./services/matching-engine')

router.get('/book', function(req, res) {
  res.json(matchingEngine.getBook())
})

router.post('/buy', function(req, res) {
  res.send()
})

module.exports = router
