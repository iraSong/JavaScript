'use strict'
/**
 * 分析师
 */
import ModelApi from './api'

export default class ModelMaster extends ModelApi {

  constructor() {
    super()
  }
  // 找师傅
  * getMasterList(koaThis, type) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.website.master',
        v: '1.0',
        imei: '123',
        data: {
          'type': type,
          'market': '0'
        }
      }
    })
    return response.body.data
  }
  // 找思路
  * getRouteList(koaThis, type) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.basket.webThinking',
        v: '1.0',
        imei: '123',
        data: {
        }
      }
    })
    return response.body.data
  }
  // 找圈子
  * getCircleList(koaThis, type) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.website.hotbeta',
        v: '1.0',
        imei: '123',
        data: {
        }
      }
    })
    return response.body.data
  }
}
