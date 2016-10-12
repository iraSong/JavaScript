import ModelDetail from '../models/detail-news'
import MobileDetect from 'mobile-detect'
import getConfig from '../config'
const config = getConfig()
export default class CtrlDetail extends ModelDetail {
  constructor() {
    super()
  }
  // 组合详情
  * all(koaThis) {
    let id = koaThis.params.id
    id = id.split('.')[0]
    // 手机访问
    let md = new MobileDetect(koaThis.req.headers['user-agent'])
    if (md.phone() || md.os() === 'AndroidOS') {
      // 来自 universal link
      let referrer = koaThis.request.get('referer')
      let mobilePath = config.domain.mobile + '/tcontent/post/' + id + '.html'
      if (referrer.indexOf(mobilePath) > -1) {
        yield koaThis.render('universal-link-404')
      } else {
        koaThis.redirect(mobilePath)
      }
      return
    }
    // PC
    let data = yield super.getDetailNews(koaThis, id)
    yield koaThis.render('detail-news', data.detail)
  }
}
