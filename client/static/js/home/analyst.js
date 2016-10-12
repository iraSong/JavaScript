/**
 * 明星分析师
 */
var app = require('../mod/app')
var analystDetailTmpl = require('../tmpl/analyst-detail.hbs')
var analystTmpl = require('../tmpl/analyst.hbs');
(function() {
  var $analystList = $('.ul-analyst')
  var $analystDetail = $('.main-left-analyst')
  var analystDetail = {}
  var analystList = []
  var el
  var model = {
    // 获取 分析师列表参数
    getParams: function() {
      let start = $(el).data('start') - 1
      var params = {
        api: 'api.system.user.webheros',
        v: '1.0',
        imei: '123',
        data: { start: start, limit: '6' }
      }
      return params
    },
    // 获取详情参数
    getDetailParams: function() {
      let id = $(el).closest('li').data('id')
      var params = {
        api: 'api.system.user.webheroinfo',
        v: '1.0',
        imei: '123',
        data: { id: id }
      }
      return params
    },
    fetchList: function() {
      var params = this.getParams()
      return app.load(params)
    },
    fetchDetail: function() {
      var params = this.getDetailParams()
      return app.load(params)
    }
  }

  var ctrl = {
    showDetail: function(El) {
      el = El
      return model.fetchDetail()
        .then(function(ret) {
          view.renderDetail(ret.data.info)
        }, function(err) {
          console.log(err)
        })
    },
    loadAnalyst: function(El) {
      el = El
      return model.fetchList()
        .then(function(ret) {
          if (ret.data.userlist) {
            analystDetail = ret.data.userlist[0]
            analystList = ret.data.userlist
          }
          view.renderPortfolio()
        }, function(err) {
          console.log(err)
        })
    }

  }

  var view = {
     /**
     * (description) 分页
     * @param event (description)
     */
    changeCurrent: function(el) {
      // 分页样式变化
      $(el).closest('ul').find('.p_current')
      .removeClass('p_current')
      $(el).addClass('p_current')
    },
    renderPortfolio: function() {
      this.renderAnalyst()
      // this.renderAnalystDetail()
      // $('.ul-analyst li:first').addClass('current-analyst')
      this.changeCurrent(el)
    },
    renderAnalyst: function() {
      let analystHtml = analystTmpl({
        analystList: analystList
      })
      $analystList.html(analystHtml)
    },
    // 分页时渲染第一个详情
    renderAnalystDetail: function() {
      let analystHtml = analystDetailTmpl({
        analystDetail: analystDetail
      })
      $analystDetail.html(analystHtml)
    },
    // 单独点击一个渲染详情
    renderDetail: function(detail) {
      let analystHtml = analystDetailTmpl({
        analystDetail: detail
      })
      $analystDetail.html(analystHtml)
      $('.txt-down-analyst').map(function() {
        // 超出显示省略号
        if (this.offsetHeight < this.scrollHeight) {
          $(this).find('.ellipsis').removeClass('dHide')
        }
      })
    }
  }
  module.exports = ctrl
}())
