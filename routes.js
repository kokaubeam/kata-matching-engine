const createError = require('http-errors')
const Joi = require('joi')
const express = require('express')
const router = express.Router()
const matchingEngine = require('./services/matching-engine')

router.get('/book', function(req, res) {
  const { buys, sells } = matchingEngine.getBook()

  res.json({
    buys: buys.map(({ quantity: qty, price: prc }) => ({ qty, prc })),
    sells: sells.map(({ quantity: qty, price: prc }) => ({ qty, prc }))
  })
})

router.post('/buy', function(req, res, next) {
  const schema = Joi.object().keys({
    qty: Joi.number().positive().required().options({ language: { any: { allowOnly: 'must match password' } } }),
    prc: Joi.number().positive().required()
  })

  const result = Joi.validate(req.body, schema, {
    abortEarly: false,
    language: { key: '' }
  })

  if (result.error) {
    const httpError = createError(422)
    httpError.errors = result.error.details.reduce((errors, err) => {
      errors[err.path.join('.')] = err.message
      return errors
    }, {})
    
    next(httpError)
    return
  }

  const {qty: quantity, prc: price} = result.value
  matchingEngine.buy(quantity, price)
  
  res.send()
})

router.post('/sell', function(req, res, next) {
  const schema = Joi.object().keys({
    qty: Joi.number().positive().required().options({ language: { any: { allowOnly: 'must match password' } } }),
    prc: Joi.number().positive().required()
  })

  const result = Joi.validate(req.body, schema, {
    abortEarly: false,
    language: { key: '' }
  })

  if (result.error) {
    const httpError = createError(422)
    httpError.errors = result.error.details.reduce((errors, err) => {
      errors[err.path.join('.')] = err.message
      return errors
    }, {})
    
    next(httpError)
    return
  }

  const {qty: quantity, prc: price} = result.value
  matchingEngine.sell(quantity, price)
  
  res.send()
})

module.exports = router
