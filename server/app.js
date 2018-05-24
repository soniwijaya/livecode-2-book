require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const index = require('./routes/index')
const user = require('./routes/users')
const book = require('./routes/book')

mongoose.connect('mongodb://localhost/book')
//mongoose.connect(`mongodb://${process.env.DATABASENAME}:${process.env.DATABASEPW}@ds129560.mlab.com:29560/blogfinish`)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('now server connected')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', index)
app.use('/users', user)
app.use('/books', book)

module.exports = app