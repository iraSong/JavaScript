var banner = require('./banner')
var analyst = require('./analyst')
var portfolio = require('../ctrl/portfolio-detail')
var search = require('../ctrl/search');
// var portfolio = require('./portfolio-detail')
(function() {
  var ctrl = {
    init: function() {
      this.initStyle()
      this.initEvent()
      banner.initBanner()
      this.initBannerImg()
      // this.initVideo()
    },
    initVideo: function() {
      var video = new window.tvp.VideoInfo()
      video.setVid('u0327ybpw26')
      var player = new window.tvp.Player()
      player.create({
        width: 554,
        height: 308,
        video: video,
        modId: 'mod_player1',
        autoplay: false,
        vodFlashExtVars: {
          clientbar: 0,
          searchpanel: 0
        }
      })
    },
    initBannerImg: function() {
      $('.box').each(function() {
          // set size
        var th = $(this).height() // box height
        var tw = $(this).width() // box width
        var proportionBox = tw / th
        var im = $(this).find('img') // image
        $('<img/>').attr('src', $(im).attr('src')).load(function() {
          var ih = im.height() // inital image height
          var iw = im.width()// initial image width
          var proportionImg = iw / ih
          if (proportionBox > proportionImg) { // if portrait
            im.addClass('ww').removeClass('wh')// set width 100%
          } else { // if landscape
            im.addClass('wh').removeClass('ww')// set height 100%
          }
        })
      })
    },
    initStyle: function() {
      // 分析师默认选中第一个
      $('.ul-analyst li:first').addClass('current-analyst')
    },
    initEvent: function() {
      this.initDownload()
      this.analystEvnet()
      this.searchEvent()
      this.initNews()
    },
    initNews: function() {
      $('.type-content, .txt-down-analyst').map(function() {
        // 超出显示省略号
        if (this.offsetHeight < this.scrollHeight) {
          $(this).find('.ellipsis').removeClass('dHide')
        }
      })
      $('.wrap-news').on('click', '.type', function() {
        let id = $(this).attr('topicid')
        window.location.href = '/news/' + id
      })
      $('.wrap-news').on('click', '.fz-gray-news, .title-news, .type-content', function() {
        let herf = $(this).parent('.sec-news')
        .find('.detail-news a').attr('href')
        window.location.href = herf
      })
    },
    initDownload: function() {
      // 下载按钮点击
      $('#download').on('click', function() {
        view.showDownload()
      })
      $('.btn-down-introduce').on('click', function() {
        view.showDownload()
      })
      // 浮层点击
      $('#mask').on('click', function() {
        view.hideDownload()
      })
    },
    analystEvnet: function() {
      // 明星分析师列表点击
      $('.ul-analyst').on('click', 'li', function(event) {
        view.showAnalystDetail(this)
        // 获取数据并显示
        analyst.showDetail(this)
      })
      // 明星分析师分页
      $('.pages').on('click', 'li', function() {
        view.changeCurrent(this)
        // 获取数据并显示
        analyst.loadAnalyst(this)
      })
      // 5s 自动分页
      ctrl.initAutoPage()
      // 详情介绍
      $('.main-left-analyst').on('click', '#btn-see', function(event) {
        let url = $(this).data('url')
        ctrl.toDetailPage(url)
      })
    },
    initAutoPage: function() {
      setInterval(function() {
        let nextEl = $('.p_current').next()
        if (nextEl.length === 0) {
          nextEl = $('.pages li:first')
        }
        view.changeCurrent(nextEl)
        // 获取数据并显示
        analyst.loadAnalyst(nextEl)
      }, 5000)
    },
    toDetailPage: function(url) {
      if (url) {
        var substr = url.match(/(post\/=?)(\S*)(?=\.html)/)
        let id = +substr[2]
        if (typeof id === 'number') {
          window.location.href = '/tcontent/post/' + id + '.html'
        }
      }
    },
    searchEvent: function() {
      $('#btn-search').on('click', function() {
        let keyword = $('#search-input').val()
        if (!ctrl.validate(keyword)) return false
        search.getPortfolioList(keyword)
        view.showSearch(keyword)
      })
      $('#result-search').on('click', function() {
        let keyword = $('#result-input').val()
        if (!ctrl.validate(keyword)) return false
        search.getPortfolioList(keyword)
      })
      // 回车事件
      $('#search-input').bind('keyup', function(event) {
        if (event.keyCode === 13) {
          // 回车执行查询
          $('#btn-search').click()
        }
      })
      $('#result-input').bind('keyup', function(event) {
        if (event.keyCode === 13) {
          // 回车执行查询
          $('#result-search').click()
        }
      })
      // 查看持仓详情
      $('#seeDetail').on('click', function() {
        view.showDownload()
      })
      // 组合列表点击
      $('#search-result').on('click', '.list li', function(event) {
        var id = $(this).data('id')
        view.openPortfolio(event)
        // 获取数据并显示
        portfolio.fetchPortfolio(id)
      })
      $('.close').on('click', function() {
        view.closeOpen()
      })
    },
    validate: function(keyword) {
      if (!keyword || keyword.trim() === '') {
        $('.validate-search').removeClass('dHide')
        setTimeout(function() {
          $('.validate-search').addClass('dHide')
        }, 1500)
        return false
      }
      return true
    }
  }
  var view = {
    showAnalystDetail: function(el) {
      // 当前选中样式变化
      $(el).closest('ul').find('.current-analyst')
      .removeClass('current-analyst')
      $(el).addClass('current-analyst')
      // 当前分析师详情变化
      // this.detailChange(event)
    },
    hideDownload: function() {
      $('#download-box').addClass('dHide')
      $('#mask').addClass('dHide')
    },
    closeOpen: function() {
      $('#open, .mask').addClass('dHide')
    },
    openPortfolio: function(event) {
      $('#open, .mask').removeClass('dHide')
    },
    /**
     * (description) 分页
     * @param event (description)
     */
    changeCurrent: function(elLi) {
      // 分页样式变化
      $(elLi).closest('ul').find('.p_current')
      .removeClass('p_current')
      $(elLi).addClass('p_current')
      // this.detailChange(event)
    },
    detailChange: function(event) {
      // 分析师详情变化
      let nameText = $(event.target).closest('li').find('.txt-analyst').text()
      let contentText = $(event.target).closest('li').find('.txt-12-analyst').text()
      $('.intro-right-analyst').find('.fz-18').text(nameText)
      $('.intro-right-analyst').find('.fz-14').text(contentText)
    },
    /** 搜索组合 */
    showSearch: function(keyword) {
      $('.body').addClass('dHide')
      $('.search-result').removeClass('dHide')
      $('#result-input').val(keyword)
      window.scrollTo(0, 0)
    },
    showDownload: function() {
      $('#open').addClass('dHide')
      $('#download-box, #mask').removeClass('dHide')
    }
  }
  module.exports = ctrl
}())

