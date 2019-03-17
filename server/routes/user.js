const router = require('express').Router()
const User = require('../controllers/user')

router.post('/register', User.register)

router.post('/login', User.login)

router.post('/googleLogin', User.googleLogin)

// router.get('/list', User.list) // for development purposes

module.exports = router