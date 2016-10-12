/**
 * 嫁接服务端接口
 */

import coRequest from 'co-request'
// import md5 from 'blueimp-md5'
// import config from '../../config.json'
import getConfig from '../config'
const config = getConfig()

export default class Fetch {

  * fetch(koaThis, {url, method = 'post', params: {api = '', v = '1.0', data = {}}}) {
    let coParams = {
      uri: config.server.uri + url,
      method: method,
      encoding: 'utf8',
      timeout: 300000
    }
    let cookie = koaThis.cookies.request.headers.cookie
    if (cookie) {
      coParams.headers = {
        Cookie: cookie
      }
    }
    // data 转换成字符串形式
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    // let dataSent = {
    //   api: api,
    //   v: v,
    //   data: data,
    //   s: md5(data),
    //   sid: koaThis.cookies.get('sid')
    // }
    // data = md5(data)
    let dataSent = 'api=' + api + '&v=' + v + '&imei=123&data=' + data
    console.info(`

=================== ${config.server.uri}${url} request ==================

      `, JSON.stringify(dataSent))

    if (method.toLowerCase() === 'get') {
      coParams.qs = dataSent
    } else {
      coParams.form = dataSent
    }
    // 发起请求
    let response
    try {
      response = yield coRequest(coParams)
    } catch (err) {
      let statusCode
      let errorMsg
      switch (err.code) {
      case 'ETIMEDOUT':
        statusCode = 504
        errorMsg = '服务器超时'
        break
      default:
        statusCode = '50x'
        errorMsg = '未知错误。与服务器通信失败'
      }
      response = {
        statusCode: statusCode,
        body: {
          code: statusCode,
          error_msg: errorMsg
        }
      }
    }

    // 初步处理数据
    switch (response.statusCode) {
    case 200:
      try {
        let parsedBody = JSON.parse(response.body)
        response.body = parsedBody
      } catch (e) { }
      break
    default:
    }
    console.info(`

=================== ${config.server.uri}${url} response =================

      `, response.body)
    // 将数据返回到发起的模块进行差异化处理
    return response
  }
}
