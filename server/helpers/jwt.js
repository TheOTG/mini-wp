const jwt = require('jsonwebtoken')

module.exports = {
    sign: function(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    },
    verify: function(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
}