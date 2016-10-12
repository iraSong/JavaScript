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
      $('.nav-items').on('click', 'li a', function() {
        view.showPanel(this)
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
    showPanel: function(thisEl) {
      $('.result .result-main').addClass('dHide')
      let showId = $(thisEl).attr('showPanel')
      $('#' + showId).removeClass('dHide')
      $('.nav-items a').removeClass('active')
      $(thisEl).addClass('active')
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
