;
'use strict'
/**
 * 搜索结果
 */
var app = require('../mod/app')
var searchTmpl = require('../tmpl/search.hbs');
(function() {
  var model = {
    getParams: function(keyword) {
      var params = {
        api: 'api.system.website.search',
        v: '1.0',
        imei: '123',
        data: { keyword: keyword }
      }
      return params
    },
    fetchList: function(id) {
      var params = this.getParams(id)
      return app.load(params)
    }
  }

  var ctrl = {
    getPortfolioList: function(keyword) {
      return model.fetchList(keyword)
        .then(function(ret) {
          if (ret.data) {
            var expertBetas = ret.data.expertBetas
            var normalBetas = ret.data.normalBetas
          }
          view.renderPortfolio(expertBetas, normalBetas)
        }, function(err) {
          console.log(err)
        })
    }
  }

  var view = {
    renderPortfolio: function(expertBetas, normalBetas) {
      var searchHtml = searchTmpl({
        expertBetas: expertBetas,
        normalBetas: normalBetas
      })
      $('#search-result').html(searchHtml)
    }
  }
  module.exports = ctrl
}())
