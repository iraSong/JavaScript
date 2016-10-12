module.exports = function(v, len) {
  if (isNaN(v)) return '--'
  len = len * 1 || 2
  return (v * 100).toFixed(len)
}
