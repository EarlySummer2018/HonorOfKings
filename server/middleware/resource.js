module.exports = options => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resoure)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}