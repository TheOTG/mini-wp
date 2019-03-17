const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
    static register(req, res) {
        const { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            if(err.ValidationError !== null) {
                res.status(400).json(err)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static login(req, res) {
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user && bcrypt.compare(password, user.password)) {
                const payload = {
                    id: user.id
                }
                const access_token = jwt.sign(payload)
                res.status(200).json(access_token)
            } else {
                res.status(400).json({
                    message: 'Wrong email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static googleLogin(req, res) {
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const { email, name } = ticket.getPayload()
            return User.findOneAndUpdate({
                email
            },{
                name,
                email,
                password: name.slice(0, 3) + email.slice(0, 3)
            }, {
                new: true,
                upsert: true
            })
        })
        .then(result => {
            const payload = {
                id: result._id
            }
            const access_token = jwt.sign(payload)
            res.status(200).json(access_token)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static list(req, res) {
        User.find({})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController