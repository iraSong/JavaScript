import ModelApi from '../models/api'

export default class CtrlApi extends ModelApi {
  constructor() {
    super()
  }
  * init(koaThis) {
    let params = koaThis.request.body
    let response
    switch (params.api) {
    case 'common.rsa':
      response = yield super.fetch(koaThis, 'rsa')
      break
    case 'common.captcha.verify':
      response = yield this.captcha.verify(koaThis, params)
      break
    default:
      response = yield super.fetch(koaThis, {
        url: '/cn-jsfund-server-mobile/bkt/webapi',
        params: {
          api: 'api.system.basket.webChart',
          v: '1.0',
          imei: '123',
          data: params.data
        }
      })
    }
    koaThis.response.set(response.headers)
    koaThis.response.body = response.body
  }

  // 组合详情
  * detail(koaThis) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.basket.webDetail',
        v: '3.1',
        imei: '123',
        data: {
          bktid: '141'
        }
      }
    })
    koaThis.response.set(response.headers)
    koaThis.response.body = response.body
  }
  * load(koaThis) {
    let params = koaThis.request.body
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: params.api,
        v: params.v,
        imei: params.imei,
        data: params.data
      }
    })
    koaThis.response.set(response.headers)
    koaThis.response.body = response.body
  }
}
