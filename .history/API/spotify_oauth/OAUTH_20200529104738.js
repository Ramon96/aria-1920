module.exports = function (req, res, next) {
  console.log('This is middleware')
  console.log(req.params)
  next()
}
