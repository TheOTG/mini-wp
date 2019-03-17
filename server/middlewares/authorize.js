const Article = require('../models/article')

module.exports = function(req, res, next) {
    try {
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            if(article.author.toString() === req.author.toString()) {
                next()
            } else {
                throw new Error(`Forbidden`)
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
    } catch(err) {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}