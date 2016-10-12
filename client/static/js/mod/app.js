var help = require('../hbs-helper/date')
var fetch = require('./fetch');
(function() {
  var model = {
    paramsToStr: function(dataParams) {
      var _t = this
      for (var key in dataParams) {
        if (Object.prototype.toString.call(dataParams[key]) === '[object Number]') {
          dataParams[key] += ''
        } else if (Object.prototype.toString.call(dataParams[key]) === '[object Object]') {
          _t.paramsToStr(dataParams[key])
        }
      }
      return dataParams
    },
    load: function(dataParams) {
      var params = model.paramsToStr(dataParams)
      return fetch.load(params)
    },
    fetch: function(dataParams, gifMod) {
      var params = model.paramsToStr(dataParams)
      return fetch.api(params, gifMod)
    }
  }
  module.exports = {
    load: model.load,
    fetch: model.fetch,
    help: help
  }
}())
