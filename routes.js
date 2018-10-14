const express = require('express')
const router = express.Router()
const matchingEngine = require('./services/matching-engine')

router.get('/book', function(req, res, next) {
  res.json(matchingEngine.getBook())
})

module.exports = router
