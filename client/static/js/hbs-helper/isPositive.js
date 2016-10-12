module.exports = function(param, options) {
  if ((param * 1) > 0) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
