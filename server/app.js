const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/miniwp', { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/articles', require('./routes/article'))

module.exports = app
