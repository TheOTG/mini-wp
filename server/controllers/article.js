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
        Article.create({ ...req.body })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
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