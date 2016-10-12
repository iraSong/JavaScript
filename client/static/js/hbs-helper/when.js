module.exports = function(left, operator, right, options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper "when" needs 3 parameters')
  }

  if (options === undefined) {
    options = right
    right = operator
    operator = '==='
  }

  var operators = {
    '==': function(l, r) {
      return l === r
    },
    '===': function(l, r) {
      return l === r
    },
    '!=': function(l, r) {
      return l !== r
    },
    '!==': function(l, r) {
      return l !== r
    },
    '<': function(l, r) {
      return l * 1 < r * 1
    },
    '>': function(l, r) {
      return l * 1 > r * 1
    },
    '<=': function(l, r) {
      return l * 1 <= r * 1
    },
    '>=': function(l, r) {
      return l * 1 >= r * 1
    },
    'typeof': function(l, r) {
      return typeof l === r
    },
    'indexOf': function(l, r) {
      return l.indexOf(r) >= 0
    },
    'startWith': function(l, r) {
      return l.indexOf(r) === 0
    },
    'endWith': function(l, r) {
      return l.indexOf(r) === r.length - 1
    }
  }

  if (!operators[operator]) {
    throw new Error('Handlebars Helper "when" doesn\'t know the operator ' + operator)
  }

  var result = operators[operator](left, right)

  if (result) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
