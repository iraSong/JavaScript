;
'use strict';
(function() {
  var ctrl = {
    init: function() {
      this.initEvent()
    },
    initEvent: function() {
      $('.largeV-result').on('click', '.list li', function() {
        let url = $(this).data('url')
        if (url) {
          var substr = url.match(/(post\/=?)(\S*)(?=\.html)/)
          let id = +substr[2]
          if (typeof id === 'number') {
            window.location.href = '/tcontent/post/' + id + '.html'
          }
        }
      })
      $('.official').on('click', function() {
        let url = $(this).data('url')
        console.log(url)
        if (url) {
          var substr = url.match(/(post\/=?)(\S*)(?=\.html)/)
          let id = +substr[2]
          if (typeof id === 'number') {
            window.location.href = '/tcontent/post/' + id + '.html'
          }
        }
      })
      $('.profile .gray').map(function() {
        // 超出显示省略号
        if (this.offsetHeight < this.scrollHeight) {
          $(this).find('.ellipsis').removeClass('dHide')
        }
      })
    }
  }
  module.exports = ctrl
}())
