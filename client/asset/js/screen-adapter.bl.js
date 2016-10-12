(function() {
  const baseSize = 16
  const setFontSize = () => {
    const scale = document.documentElement.clientWidth / 640
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
  }

  setFontSize()
  window.onresize = setFontSize
}())
