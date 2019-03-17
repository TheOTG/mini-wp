const router = require('express').Router()
const Article = require('../controllers/article')
const image = require('../middlewares/image')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use(authenticate)

router.get('/user', Article.myList)

router.get('/', Article.list)

router.post('/', image.multer.single('file'), image.sendUploadToGCS, Article.create)

router.get('/:id', Article.findOne)

router.put('/:id', image.multer.single('file'), image.sendUploadToGCS, Article.update)

router.delete('/:id', authorize, Article.delete)

module.exports = router