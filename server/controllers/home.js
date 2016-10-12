import ModelHome from '../models/home'
import MobileDetect from 'mobile-detect'
import getConfig from '../config'
const config = getConfig()
export default class ModelPortfolio extends ModelHome {
  constructor() {
    super()
  }
  // 首页
  * all(koaThis) {
    // 手机访问，直接跳手机版首页
    let md = new MobileDetect(koaThis.req.headers['user-agent'])
    if (md.phone() || md.os() === 'AndroidOS') {
      yield koaThis.render('mobile-home')
      return
    }
    let portfolioList = []
    let analystList = []
    let analystDetail = {}
    let newsList = []
    let videoList = []
    let keyword = []
    let banners = []
    // 获取 分析师列表和详情数据
    analystList = yield super.getAnalystList(koaThis)
    if (analystList.userlist) {
      analystDetail = analystList.userlist[0]
      analystList = analystList.userlist
    }
    // 获取 新闻列表数据
    newsList = yield super.getNewsList(koaThis, config.topicId.id1)
    let news2 = yield super.getNewsList(koaThis, config.topicId.id2)
    let news3 = yield super.getNewsList(koaThis, config.topicId.id3)
    newsList = newsList.articles
    news2 = news2.articles
    news3 = news3.articles
    // // 获取视频数据
    videoList = yield super.getVideoList(koaThis)
    videoList = videoList.list

    banners = yield super.getBannerList(koaThis)
    banners = banners.banners.slice(0, 3) // 取前三个
    yield koaThis.render('home', {
      portfolioList: portfolioList,
      analystList: analystList,
      analystDetail: analystDetail,
      newsList: newsList,
      news2: news2,
      news3: news3,
      videoList: videoList,
      keyword: keyword,
      banners: banners
    })
  }
  // 新闻列表 公司动态页面数据加载
  * news(koaThis) {
    let id = koaThis.params.id || config.topicId.id1
    let newsList = []
    newsList = yield super.getNews(koaThis, id)
    yield koaThis.render('news', {
      newsList: newsList.articles,
      count: newsList.count
    })
  }
}
