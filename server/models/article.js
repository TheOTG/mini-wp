const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
    title: String,
    content: String,
    created_at: Date
})

articleSchema.pre('save', function (next) {
    this.created_at = new Date(this.created_at)
    next()
})

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article