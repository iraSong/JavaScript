'use strict';(function(){var baseSize=16;var setFontSize=function setFontSize(){var scale=document.documentElement.clientWidth/640;document.documentElement.style.fontSize=baseSize*Math.min(scale,2)+'px'};setFontSize();window.onresize=setFontSize})();