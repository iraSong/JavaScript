module.exports = function(str) {
  if (str !== '') {
    str = str.replace(/\r+/g, '&nbsp;')
    // str = str.replace(/\n+/g, '<br>')
    str = str.replace(/\n+/g, '')
    return str + ''
    // return new hbs.SafeString(str)
  }
}
