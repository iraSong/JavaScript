module.exports = {
  format: function(s, pattern = 'YYYY-MM-DD') {
    var two = function(numStr) {
      return ('00' + numStr).slice(-2)
    }
    var date = this.get(s)
    var dateObj = {
      'YYYY': date.getFullYear(),
      'YY': two(date.getFullYear()),
      'MM': two(date.getMonth() + 1),
      'M': date.getMonth() + 1,
      'DD': two(date.getDate()),
      'D': date.getDate(),
      'hh': two(date.getHours()),
      'h': date.getHours(),
      'mm': two(date.getMinutes()),
      'm': date.getMinutes()
    }
    // 支持 - . / 空格 年 月 日 作为分隔符
    var pieces = pattern.split(/(-|\.|[\u4e00-\u9fa5]{1}| |\/)/)
    var ret = pieces.map(function(it) {
      return dateObj[it] || it
    })
    return ret.join('')
  },
  get: function(s) {
    /*eslint-disable no-useless-escape */
    if (s instanceof Date) {
      return s
    } else if (/[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}\:[\d]{2}\:[\d]{2}/i.test(s)) { // 2015-08-28 08:00:00 safari bug Invalid Date
      var parts = s.split(/\-|\:| /)
      return new Date(+parts[0], +parts[1] - 1, +parts[2], +parts[3], +parts[4], +parts[5])
    } else {
      return new Date(s)
    }
    /* eslint-enable no-useless-escape */
  },
  UTC: function(s) {
    var date = this.get(s)
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  }
}
