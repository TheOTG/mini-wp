const router = require('express').Router()
const Article = require('../controllers/article')

router.get('/', Article.list)

router.post('/', Article.create)

router.get('/:id', Article.findOne)

router.put('/:id', Article.update)

router.delete('/:id', Article.delete)

module.exports = router