module.exports = function(param, options) {
  if (param && param !== '' && param.length > 0) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
