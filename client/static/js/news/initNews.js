;
'use strict'
var tempNews = require('../tmpl/news.hbs')
var app = require('../mod/app');
(function() {
  var $news = $('#newsList')
  var $list = $('.list-news')
  var $prePage = $('.page-left')
  var $nextPage = $('.page-right')
  var $navItem = $('.nav-items')
  var topicId = window.location.href.split('/').pop() ||
      $navItem.find('li').first().attr('topicId')
  var start
  var ctrl = {
    init: function() {
      this.initStyle()
      this.initEvent()
    },
    initStyle: function() {
      this.initNavStyle()
      this.initPagesStyle(0)
    },
    initNavStyle: function() {
      let topicId = window.location.href.split('/').pop()
      let $navA = $('[topicid=' + topicId + ']').find('a')
      if ($navA.length > 0) {
        $('[topicid=' + topicId + ']').find('a').addClass('active')
      } else {
        $('.nav-items a:first').addClass('active')
      }
    },
    initPagesStyle: function(current, totalCount) {
      // 初始化默认样式和分页组件
      let count = totalCount || window.beta.count
      let totalPages = Math.ceil(count / window.beta.limit)
      if (totalPages < 2) {
        $('.pages-news').addClass('vHide')
        return false
      }
      $('.pages-news').removeClass('vHide')
      var html = ''
      if (current > 0) {
        $('.page-left').removeClass('vHide')
        html += '<li><a>1</a></li>'
      } else {
        $('.page-left').addClass('vHide')
        html += '<li class="current-news"><a>1</a></li>'
      }
      if (current > 4 && totalPages > 4 * 2 + 1) {
        html += '<li><a>...</a></li>'
      }
      for (let n = 0; n < totalPages; n++) {
        if (n > 0 && n < totalPages - 1 && (Math.abs(n - current) < 4 ||
          current <= 4 && n < 4 * 2 + 1 ||
          current >= totalPages - 1 - 4 && n > totalPages - 1 - 4 * 2)) {
          if (current === n) {
            html += '<li class="current-news"><a>' + (n + 1) + '</a></li>'
          } else {
            html += '<li><a>' + (n + 1) + '</a></li>'
          }
        }
      }
      if (current < totalPages - 5 && totalPages > 4 * 2 + 1) {
        html += '<li><a>...</a></li>'
      }
      if (current < totalPages - 1) {
        $('.page-right').removeClass('vHide')
        html += '<li><a>' + totalPages + '</a></li>'
      } else {
        $('.page-right').addClass('vHide')
        html += '<li class="current-news"><a>' + totalPages + '</a></li>'
      }
      let $list = $('.list-news')
      $list.html(html)
    },
    initEvent: function() {
      // 点击任意 页
      $list.on('click', 'a', function(event) {
        start = +$(this).text() - 1
        if (isNaN(start)) {
          return false
        } // 点击'...'
        ctrl.getNextPage(start)
      })
      // 上一页
      $prePage.on('click', function() {
        start = +$('.current-news').find('a').text() - 1
        ctrl.loadPage(start)
      })
      // 下一页
      $nextPage.on('click', function() {
        start = +$('.current-news').find('a').text() + 1
        ctrl.loadPage(start)
      })
      // 导航栏目点击
      // $navItem.on('click', 'li', function() {
      //   topicId = $(this).attr('topicId')
      //   ctrl.getNextPage(0)
      //   ctrl.initPagesStyle(0)
      //   view.changeNavActive(this)
      // })
    },
    getParams: function(start) {
      var params = {
        api: 'api.system.cms.article.getwebpastarticles',
        v: '1.0',
        imei: '123',
        data: {
          'topicId': topicId,
          'start': start,
          'limit': window.beta.limit
        }
      }
      return params
    },
    // 加载任意页
    getNextPage: function(start) {
      // e = event
      var params = this.getParams(start)
      // 获取数据并显示
      app.load(params)
        .then(function(ret) {
          ctrl.initPagesStyle(start, ret.data.count)
          view.renderNews(ret.data.articles)
        }, function(err) {
          console.log(err)
        })
    },
    // 加载上一页下一页
    loadPage: function(start) {
      start = start - 1
      var params = this.getParams(start)
      // 获取数据并显示
      app.load(params)
        .then(function(ret) {
          ctrl.initPagesStyle(start, ret.data.count)
          view.renderNews(ret.data.articles)
        }, function(err) {
          console.log(err)
        })
    }
  }
  var view = {
    /**
     * (description) 渲染模版文件
     * @param list (description) 数据
     */
    renderNews: function(list) {
      let newsHtml = tempNews({
        newsList: list
      })
      $news.html(newsHtml)
    },
    changeNavActive: function(el) {
      $navItem.find('a').removeClass('active')
      $(el).find('a').addClass('active')
    }
  }
  module.exports = ctrl
}())
