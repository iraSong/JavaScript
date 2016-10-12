/**
 * 引用的专业版代码
 * modify by swh
 */
'use strict'

require('../mod/highcharts-global')
var markTmpl = require('../tmpl/mark.hbs')
var Promise = require('../lib/es6-promise.min').Promise
var app = require('../mod/app');
(function() {
  var color = ['#fd6f02', '#c7c7c7']
  var $chart = $('#chart')
  var $open = $('#open')
  var chartId // 获取图表数据的id
  var _tmp = {}
  var nodes = {
    returnType: $chart.find('.j-return-type'), // 本周、本月、本年、创建以来
    standard: $chart.find('.j-standard'), // 沪深300、上证指数等
    value: $chart.find('.j-value'),
    date: $chart.find('.j-date'), // 日期
    index: $chart.find('.j-index'), // 净值
    returns: $chart.find('.j-return'), // 收益
    chart: $chart.find('.chart') // highchart 容器
  }

  function colorValue(value, scale) {
    scale = scale || 1

    var scaledValue = value * scale
    if (scale === 100) {
      scaledValue = scaledValue.toFixed(2, 10) + '%'
    }
    if (value > 0) {
      return '<v class="txt-color-red">+' + scaledValue + '</v>'
    } else if (value < 0) {
      return '<v class="txt-color-green">' + scaledValue + '</v>'
    } else {
      return '<v class"txt-color-gray>' + scaledValue + '</v>'
    }
  }

  function getMinAndMax(list) {
    var min
    var max
    for (var i = 0, len = list.length; i < len; i++) {
      var v = +list[i].y
      if (min !== undefined && v < min || min === undefined) {
        min = v
      }
      if (max !== undefined && v > max || max === undefined) {
        max = v
      }
    }
    return [min, max]
  }

  // function changeXY(list, field) {
  //   return list.map(function(xy) {
  //     return {
  //       x: app.help.UTC(xy.startDt),
  //       y: +xy[field]
  //     }
  //   })
  // }
  function changeXY(list) {
    return list.map(function(xy) {
      return {
        x: app.help.UTC(xy.date),
        y: +xy.value
      }
    })
  }
  function getYRange(minY, maxY) {
    // 为方便计算，扩大10倍
    minY = 10 * minY
    maxY = 10 * maxY

    var yMinAxis = Math.floor(minY)
    var yMaxAxis = Math.ceil(maxY)

    return {
      min: yMinAxis / 10,
      max: yMaxAxis / 10
    }
  }

  var chartOptions = {
    get: function(data) {
      var breaks = this.getBreaks(data.bktlist)
      var categories = this.getCategories(data.bktlist)
      var xAxis = this.getXAxis(data.bktlist[0].x, breaks, categories)
      var yAxis = this.getYAxis(data.yRange)
      var series = this.getSeries(data)
      var others = this.getOthers()
      return $.extend(others, {
        xAxis: xAxis,
        yAxis: yAxis,
        series: series
      })
    },
    getBreaks: function(list) {
      var breaks = []
      list.forEach(function(it, i) {
        if (i > 0) {
          var x = it.x
          var prevX = list[i - 1].x
          if (x - prevX > 24 * 60 * 60 * 1000) {
            breaks.push({
              breakSize: 24 * 60 * 60 * 1000,
              from: prevX,
              to: x
            })
          }
        }
      })
      return breaks
    },
    getCategories: function(list) {
      var ticks = []
      list.forEach(function(it) {
        ticks.push(it.x)
      })
      return ticks
    },

    getTickPositions: function(categories) {
      var tickPositions = []
      var len = categories.length
      if (len > 3) {
        var middleIndex = Math.floor(len / 2)
        var middlePosition = categories[middleIndex]

        tickPositions.push(categories[0])
        tickPositions.push(middlePosition)
        tickPositions.push(categories[len - 1])
      } else {
        tickPositions = categories
      }
      return tickPositions
    },

    getXAxis: function(minX, breaks, categories) {
      var _t = this
      var tickPositions = _t.getTickPositions(categories)
      return {
        type: 'datetime',
        breaks: breaks,
        labels: {
          formatter: function() {
            return app.help.format(new Date(this.value), 'YYYY-MM-DD')
          },
          style: {
            color: '#a8a8a8',
            fontSize: '12px'
          }
        },
        lineWidth: 1,
        lineColor: '#e1e1e1',
        min: minX - 1,
        tickLength: 8,
        tickColor: '#eee',
        tickPositions: tickPositions, // x轴坐标数组
        // tickPositioner: function() {
        //   // 保证最多显示6个点
        //   var step = categories.length > 5 ? Math.ceil(categories.length / 5.99999999) : 1
        //   var positions = categories.filter(function(it, i) {
        //     return i % step === 0
        //   })
        //   return positions
        // },
        plotLines: [{
          color: '#eee',
          width: 1,
          value: minX
        }]
      }
    },
    getYAxis: function(yRange) {
      var minY = yRange.min
      var maxY = yRange.max

      return {
        gridLineWidth: 1,
        gridLineColor: '#eee',
        labels: {
          style: {
            fontSize: '10px',
            color: '#A8A8A8'
          },
          formatter: function() {
            return parseInt(this.value * 100) + '%'
          }
        },
        offset: -5,
        min: minY,
        max: maxY,
        startOnTick: false,
        endOnTick: false,
        minTickInterval: 0.05,
        title: {
          text: null
        }
      }
    },
    getSeries: function(data) {
      var pointMarker = {
        radius: 6,
        states: {
          hover: {
            radius: 6
          }
        },
        symbol: 'circle'
      }
      var lineStates = {
        hover: {
          halo: false,
          lineWidthPlus: 0
        }
      }
      return [{
        type: 'line',
        color: color[0],
        data: data.bktlist,
        marker: pointMarker,
        states: lineStates,
        zIndex: 2
      }, {
        type: 'line',
        color: color[1],
        data: data.reflist,
        marker: pointMarker,
        states: lineStates,
        zIndex: 1
      }]
    },
    getOthers: function() {
      return {
        chart: {
          backgroundColor: '#fff',
          spacingLeft: 0,
          spacingRight: 0
        },
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: false
            },
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          crosshairs: [{
            width: 1,
            color: '#999',
            dashStyle: 'Dash'
          }, {
            width: 1,
            color: '#999',
            dashStyle: 'Dash'
          }],
          shared: true,
          style: {
            display: 'none'
          }
        }
      }
    }
  }

  var model = {
    type: '4', // 1周 2月 3年 4创建以来
    fetchData: function(gifMod) {
      return app.fetch({
        api: 'api.system.basket.chart',
        v: '3.1',
        data: {
          bktid: chartId,
          type: model.type
        }
      }, gifMod)
    },
    bktlist: [],
    dealData: function(data) {
      // 保存起来，highcharts tooltip需要使用它
      model.bktlist = data.bktlist

      // 1. 处理 Y 轴坐标
      // 2. 将时间 UTC 化
      var bktlist = changeXY(data.bktlist, 'roi')
      var reflist = changeXY(data.reflist, 'roi')
      var bktMinMax = getMinAndMax(bktlist)
      var refMinMax = getMinAndMax(reflist)

      var yRange = getYRange(Math.min(bktMinMax[0], refMinMax[0]), Math.max(bktMinMax[1], refMinMax[1]))

      return {
        yRange: yRange,
        bktlist: bktlist,
        reflist: reflist
      }
    }
  }

  var view = {
    showLoading: function() {
      nodes.chart.addClass('loading')
    },
    hideLoading: function() {
      nodes.chart.removeClass('loading')
    },
    updateChart: function(data) {
      var options = chartOptions.get(data)
      options.tooltip.formatter = function() {
        var x = this.x // UTC date
        var index = this.points[0].y + 1
        var refIndex = this.points[1].y + 1
        view.updateValues(x, index, refIndex)
      }
      nodes.chart.highcharts(options)

      // var a = $('.j-chart').highcharts()
      // a.exportChart()
    },
    // 净值 = 累计收益 + 1
    updateValues: function(date, index, refIndex) {
      date = app.help.format(date, 'YYYY-MM-DD')

      nodes.date.text(date)
      nodes.index.text(index.toFixed(3, 10))

      var coloredValue = colorValue((index - refIndex) / refIndex, 100)
      nodes.returns.find('v').replaceWith(coloredValue)

      nodes.value.show()
    },
    showEmpty: function() {
      nodes.chart.html('<div class="chart-error"><p>暂无数据</p></div>')
    },
    showServerError: function() {
      nodes.chart.html('<div class="chart-error j-retry"><p>未能加载图表数据，请稍后重试</p></div>')
    }
  }

  var controller = {
    init: function(id) {
      chartId = id
      this.initChart()
      this.evtReturnType()
      this.evtRetry()
    },
    initChart: function() {
      var self = this
      model.fetchData({
        show: view.showLoading,
        hide: view.hideLoading
      })
        .then(function(data) {
          let myData = data.data
          if (myData.bktlist && myData.bktlist.length > 1) {
            _tmp = {
              betaName: myData.betaName,
              normName: myData.normName
            }// title 数据
            self.renderTitle()

            var chartData = model.dealData(myData) // 图表数据
            view.updateChart(chartData)
          } else {
            return Promise.reject({
              code: 'POINTS_TOO_LESS'
            })
          }
        })['catch'](function(err) {
          if (err.code === 'POINTS_TOO_LESS') {
            view.showEmpty()
          } else {
            view.showServerError()
          }
        })
    },
    evtReturnType: function() {
      var self = this
      // nodes.returnType.on('click', function() {
      //   $(this).addClass('active')
      //     .siblings().removeClass('active')
      //   model.type = $(this).data('return-type').toString()
      //   self.initChart()
      // })
      // 防止事件多次绑定
      $('.j-return-type').unbind('click').click(function(e) {
        $(this).addClass('active')
          .siblings().removeClass('active')
        model.type = $(this).data('return-type').toString()
        self.initChart()
      })
    },
    evtRetry: function() {
      var self = this
      nodes.chart.on('click', '.j-retry', function() {
        self.initChart()
      })
    },
    renderTitle: function() {
      var markHtml = markTmpl(_tmp)
      $open.find('.mark').html(markHtml)
    }
  }
  module.exports = controller
} ())
