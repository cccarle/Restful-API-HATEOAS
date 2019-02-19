const errors = require('restify-errors')
const rjwt = require('restify-jwt-community')
const Fisher = require('../models/Fish')
const config = require('../config')

module.exports = server => {
  // GET FISH
  server.get('/fishes', async (req, res, next) => {
    try {
      const fishes = await Fisher.find({})
      res.send(fishes)
      next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  // GET SINGLE FISH
  server.get('/fishes/:id', async (req, res, next) => {
    try {
      const fish = await Fisher.findById(req.params.id)
      res.send(fish)
      next()
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `THere is no fish with id of ${req.params.id}`
        )
      )
    }
  })

  // ADD FISH
  server.post(
    '/fishes',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        )
      }

      const { longitude, latitude, specie, weight, length, imageURL } = req.body
      const fisherman = req.user.email

      const fish = new Fisher({
        fisherman,
        longitude,
        latitude,
        specie,
        weight,
        length,
        imageURL
      })

      try {
        const newFish = await fish.save()

        console.log(newFish)

        res.send(201)
        next()
      } catch (err) {
        return next(new errors.InternalError(err.message))
      }
    }
  )

  // UPDATE Fisher
  server.put(
    '/fishes/:id',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        )
      }

      try {
        const fish = await Fisher.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        )
        res.send(200)
        next()
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no fish with id of ${req.params.id}`
          )
        )
      }
    }
  )

  // DELETE Fisher
  server.del(
    '/fishes/:id',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const fish = await Fisher.findOneAndRemove({ _id: req.params.id })
        res.send(204)
        next()
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no fish with id of ${req.params.id}`
          )
        )
      }
    }
  )
}
