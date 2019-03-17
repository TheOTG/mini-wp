const Article = require('../models/article')

class ArticleController {
    static list(req, res) {
        Article.find({})
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static myList(req, res) {
        Article.find({
            author: req.author
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findOne(req, res) {
        Article.findOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static create(req, res) {
        let imageUrl = null
        if(req.file) {
            imageUrl = req.file.cloudStoragePublicUrl
        }
        Article.create({
            ...req.body,
            author: req.author,
            featured_image: imageUrl
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        let imageUrl = null
        if(req.file) {
            imageUrl = req.file.cloudStoragePublicUrl
            req.body.featured_image = imageUrl
        }
        Article.updateOne({
            _id: req.params.id
        }, {
            ...req.body
        }, {
            new: true
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Article.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res.status(200).json({
                message: 'Deleted'
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = ArticleController