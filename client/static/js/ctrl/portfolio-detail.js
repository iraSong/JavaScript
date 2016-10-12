;
'use strict'
/**
 * 组合详情
 */
var chart = require('./chart')
var app = require('../mod/app')
var markTmpl = require('../tmpl/mark.hbs')
var openTmpl = require('../tmpl/open.hbs');
(function() {
  var $open = $('#open')
  var _tmp = {}
  var model = {
    getParams: function(id) {
      var params = {
        api: 'api.system.basket.webDetail',
        v: '3.1',
        imei: '123',
        data: { bktid: id }
      }
      return params
    },
    fetchList: function(id) {
      var params = this.getParams(id)
      return app.load(params)
    }
  }

  var ctrl = {
    fetchPortfolio: function(id) {
      return model.fetchList(id)
        .then(function(ret) {
          if (ret.data.detailinfo) {
            var portfolioData = ret.data.detailinfo
            _tmp = $.extend(_tmp, portfolioData)
          }
          view.renderPortfolio()
          chart.init(id)
        }, function(err) {
          console.log(err)
        })
    }
  }

  var view = {
    renderPortfolio: function(ret) {
      var markHtml = markTmpl(_tmp)
      var openHtml = openTmpl(_tmp)
      $open.find('.left-open').html(openHtml)
      $open.find('.mark').html(markHtml)
      $('#open .tips').map(function() {
        // 超出显示省略号
        if ((this.offsetHeight + 5) < this.scrollHeight) {
          $(this).find('.ellipsis').removeClass('dHide')
        }
      })
    }
  }
  module.exports = ctrl
}())
