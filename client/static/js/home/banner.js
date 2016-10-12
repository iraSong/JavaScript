/**
  * (description) banner
  * @param args (description)
  */
(function() {
  let timeInterval = 5000
  var initBanner = function() {
    // 滚动banner
    var len = $('.focus-index > i').length
    if (len < 2) {
      $('.focus-index').addClass('dHide')
      return false
    }
    var index = 0  // 图片序号
    var bannerTimer
    $('.focus-index i').mouseover(function() {
      index = $('.focus-index i').index(this)  // 获取鼠标悬浮 li 的index
      showImg(index)
    }).eq(0).mouseover()
    // 滑入停止动画，滑出开始动画.
    $('#scrollPics').hover(function() {
      clearInterval(bannerTimer)
    }, function() {
      bannerTimer = setInterval(function() {
        showImg(index)
        index++
        if (index === len) {       // 最后一张图片之后，转到第一张
          index = 0
        }
      }, timeInterval)
    }).trigger('mouseleave')
    function showImg(index) {
      $('.slider li').removeClass('banner-current')
            .eq(index).addClass('banner-current')
      $('.focus-index i').removeClass('on')
            .eq(index).addClass('on')
    }
  }
  module.exports = {
    initBanner: initBanner
  }
}())

