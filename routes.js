const express = require('express')
const router = express.Router()

router.get('/book', function(req, res, next) {
  res.json({
    buys: [],
    sells: []
  })
})

module.exports = router
