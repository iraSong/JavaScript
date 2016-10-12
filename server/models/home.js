'use strict'
/**
 * 分析师
 */
import ModelApi from './api'

export default class ModelAnalyst extends ModelApi {

  constructor() {
    super()
  }

  /**
   * (description) 获取组合列表数据
   * @param koaThis (description)
   * @returns (description) 后天返回的数据
   */
  * getPortfolioList(koaThis) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.basket.webSearch',
        v: '1.0',
        imei: '123',
        data: {}
      }
    })
    return response.body.data
  }

  /**
   * (description) 获取分析师列表数据
   * @param koaThis (description)
   * @returns (description) 后天返回的数据
   */
  * getAnalystList(koaThis) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.user.webheros',
        v: '1.0',
        imei: '123',
        data: { start: '0', limit: '6' }
      }
    })

    return response.body.data
  }
  /**
   * (description) 获取分析师详情数据
   * @param koaThis (description)
   * @returns (description) 后天返回的数据
   */
  * getAnalystDetail(koaThis, customerId) {
    let response = yield super.fetch(koaThis, 'mobile', {
      api: 'api.system.user.customer.detail',
      data: {
        customerId: customerId
      },
      type: 'POST',
      v: '1.0'
    })
    return response.body.data
  }
  /**
   * (description) 获取新闻列表数据
   * @param koaThis (description)
   * @returns (description) 后天返回的数据
   */
  * getNewsList(koaThis, topicId) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.cms.article.getwebpastarticles',
        v: '1.0',
        imei: '123',
        data: {
          'topicId': topicId,
          'start': '0',
          'limit': '1'
        },
        key: ''
      }
    })
    return response.body.data
  }

  /**
   * (description)获取视频列表数据
   * @param koaThis (description)
   * @returns (description)
   */
  * getVideoList(koaThis) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.common.videos',
        v: '1.0',
        imei: '123',
        data: {}
      }
    })
    return response.body.data
  }
  /**
   * (description) 获取组合列表数据
   * @param koaThis (description)
   * @returns (description) 后天返回的数据
   */

  * getNews(koaThis, topicId) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.cms.article.getwebpastarticles',
        v: '1.0',
        imei: '123',
        data: {
          'topicId': topicId,
          'start': '0',
          'limit': '7'
        }
      }
    })
    return response.body.data
  }
  /**
   * 获取banner数据
   */
  * getBannerList(koaThis) {
    let response = yield super.fetch(koaThis, {
      url: '/cn-jsfund-server-mobile/bkt/webapi',
      params: {
        api: 'api.system.website.banner',
        v: '1.0',
        imei: '123',
        data: {
          'id': '111'
        }
      }
    })
    return response.body.data
  }
}
