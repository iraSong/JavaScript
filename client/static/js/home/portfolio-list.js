/**
 * 组合列表
 */
var app = require('../mod/app')
var portfolioListTmpl = require('../tmpl/portfolio-list.hbs');
(function() {
  var $portfolioList = $('#center')
  var _tmp = [] // 当前请求的数据
  // let tmpMapData = new Map() // 缓存的数据 组合可能需要实时更新
  var model = {
    getParams: function(keyword) {
      var params = {
        api: 'api.system.basket.webSearch',
        v: '1.0',
        imei: '123',
        data: {keyword: keyword}
      }
      return params
    },
    fetchList: function(keyword) {
      var params = this.getParams(keyword)
      return app.load(params)
    }
  }

  var ctrl = {
    changeList: function(keyword) {
      return model.fetchList(keyword)
      .then(function(ret) {
        if (ret.data.list) {
          var portfolioList = ret.data.list
          _tmp = portfolioList
        }
        view.renderPortfolio()
      }, function(err) {
        console.log(err)
      })
    }
  }
  var view = {
    renderPortfolio: function(ret) {
      var portfolioHtml = portfolioListTmpl({
        portfolioList: _tmp
      })
      $portfolioList.find('.menu-center').html(portfolioHtml)
      this.resetWidth()
    },
    resetWidth: function() {
      setTimeout(function() {
        $('.menu-center li').css('opacity', '1')
      }, 100)
    }
  }
  module.exports = ctrl
}())
