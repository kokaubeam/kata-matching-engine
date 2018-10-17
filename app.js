const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const routes = require('./routes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  const body = {
    message: err.message
  }
  
  if (err.status === 422 && err.errors) {
    body.errors = err.errors
  }
  
  res.status(err.status || 500)
  res.json(body)
})

module.exports = app
