const errors = require('restify-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const auth = require('../auth')
const config = require('../config')

module.exports = server => {
  // REGISTER USER

  server.post('/register', (req, res, next) => {
    const { email, password, password2 } = req.body

    const user = new User({
      email,
      password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash passwprd
        user.password = hash
        // Save User
        try {
          const newUser = await user.save()
          res.send(201)
          next()
        } catch (err) {
          return next(new errors.InternalError(err.message))
        }
      })
    })
  })

  // AUTH USER
  server.post('/auth', async (req, res, next) => {
    const { email, password } = req.body
    try {
      // auth user
      const user = await auth.authenticate(email, password)
      // create token
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '30m'
      })

      const { iat, exp } = jwt.decode(token)
      // res with token
      res.send({ iat, exp, token })

      next()
    } catch (err) {
      // USer unauith
      return next(new errors.UnauthorizedError(err))
    }
  })
}
