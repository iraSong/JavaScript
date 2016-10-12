var ajaxGif = require('./ajax-gif')
var Promise = require('../lib/es6-promise.min').Promise;
(function() {
  function ajax(params, gifMod) {
    var timeDelay
    switch (typeof gifMod) {
    case 'number':
      timeDelay = gifMod
      gifMod = ajaxGif
      break
    case 'object':
      timeDelay = 0
      break
    default:
      timeDelay = 500
      gifMod = ajaxGif
    }
    return new Promise(function(resolve, reject) {
      var gifTimer = setTimeout(function() {
        gifMod.show()
      }, timeDelay)
      $.ajax(params).done(function(response) {
        resolve(response)
      }).fail(function(err) {
        reject({
          code: -1,
          msg: '服务器错误',
          err: err
        })
      }).always(function() {
        if (gifTimer) {
          clearTimeout(gifTimer)
          gifTimer = null
        }
        gifMod.hide()
      })
    })
  }
  // 用于异步模板加载
  // dataParams: {
  //  tmpl: '相对partials目录的路径'
  //  data: {同fetachApi的dataPrams}
  //  extra: {传递给模板的数据}

  function fetchLoad(params) {
    return ajax({
      'url': '/api/ajax',
      'type': 'POST',
      'data': JSON.stringify(params),
      'dataType': 'JSON',
      'contentType': 'application/json'
    })
  }
  // 专用于通过 node 作为中间桥梁向后台请求数据使用
  function fetchApi(dataParams, gifMod) {
    return ajax({
      'url': '/api',
      'type': 'POST',
      'data': JSON.stringify(dataParams),
      'dataType': 'JSON',
      'contentType': 'application/json'
    }, gifMod)
  }
  module.exports = {
    load: fetchLoad,
    api: fetchApi
  }
}())
