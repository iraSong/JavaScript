'use strict'
/**
 * 分析师
 */
import ModelApi from './api'

export default class ModelDetail extends ModelApi {

  constructor() {
    super()
  }

  * getDetailNews(koaThis, id) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.cms.article.webdetail',
        v: '1.0',
        imei: '123',
        data: {'articleId': id}
      }
    })
    return response.body.data
  }
}
