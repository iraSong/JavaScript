(function() {
  'use strict'

  var ajaxGif = {
    exist: 0, // 当前 ajax 请求个数
    update: function(plusNum) {
      this.exist += plusNum
      if (this.exist > 0) {
        this._show()
      } else {
        this._hide()
      }
    },
    show: function() {
      this.update(1)
    },
    hide: function() {
      this.update(-1)
    },
    _show: function() {
      var $gif = $('#ajaxGif')
      if (!$gif.length) {
        $gif = $('<div id="ajaxGif"></div>').appendTo($('body'))
      }

      $gif.show()

      this.$gif = $gif
    },
    _hide: function() {
      if (this.$gif && this.$gif.length) {
        this.$gif.hide()
      }
    }
  }

  module.exports = ajaxGif
}())
