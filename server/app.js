require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}?retryWrites=true`, { useNewUrlParser: true })
.then(() => {
    console.log('Database connection established!')
})
.catch(err => {
    console.log(err)
})

// mongoose.connect(`mongodb://localhost/miniwp`, { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', require('./routes/user'))
app.use('/articles', require('./routes/article'))

module.exports = app
