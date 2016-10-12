/*eslint-disable */
'use strict';

import hbs from 'koa-hbs';
hbs.registerHelper('percentage', function(v, len) {
  var len = len * 1 || 2;
  return (v * 100).toFixed(len);
});
// 用户
hbs.registerHelper('u', function(nickname) {
  let u = '<t>' + nickname + '</t>';
  return '<user>' + u + '</user>';
});
// 字符串过滤
hbs.registerHelper('safeString', function(str) {
  if (str !== '') {
    str = str.replace(/\r/g, '&nbsp;');
    str = str.replace(/\n/g, '<br>');
    return str + '';
  }
});
hbs.registerHelper('ifFirst', function(index, options) {
  if (index === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('eqeqeq', function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('isNotEmpty', function(param, options) {
  if (param && param !== '') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
export default hbs;
/*eslint-disable */