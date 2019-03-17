const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
    title: String,
    content: String,
    created_at: {
        type: Date,
        default: new Date()
    },
    author: mongoose.Types.ObjectId,
    featured_image: String
})

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article