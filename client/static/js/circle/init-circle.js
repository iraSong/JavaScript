;
'use strict'
var portfolio = require('../ctrl/portfolio-detail');
(function() {
  var ctrl = {
    init: function() {
      this.initEvent()
    },
    initEvent: function() {
      $('.close').on('click', function() {
        view.closeOpen()
      })
      // 组合列表点击
      $('.list').on('click', 'li', function(event) {
        var id = $(this).data('id')
        view.openPortfolio(event)
        // 获取数据并显示
        portfolio.fetchPortfolio(id)
      })
      // 查看持仓详情
      $('#seeDetail').on('click', function() {
        view.showDownload()
      })
    }
  }
  var view = {
    closeOpen: function() {
      $('#open, .mask').addClass('dHide')
    },
    openPortfolio: function() {
      $('#open, .mask').removeClass('dHide')
    },
    showDownload: function() {
      $('#open').addClass('dHide')
      $('#download-box, #mask').removeClass('dHide')
    }
  }
  module.exports = ctrl
}())
