import KoaRouter from 'koa-router'
import CtrlHome from '../controllers/home'
import CtrlDetail from '../controllers/detail-news'
import CtrlPortfolio from '../controllers/find-portfolio'
export default class RouterSite {
  constructor() {
    this.CtrlHome = new CtrlHome()
    this.CtrlPortfolio = new CtrlPortfolio()
    this.CtrlDetail = new CtrlDetail()
    this.router = new KoaRouter()
    this.onRoutes()
  }
  onRoutes() {
    var self = this
    this.router
      .get('/', function*() {
        yield self.CtrlHome.all(this)
      })
      .get('/news/:id', function*() {
        yield self.CtrlHome.news(this)
      })
      .get('/contact', function*() {
        yield this.render('contact')
      })
      .get('/help', function*() {
        this.redirect('http://help.igoldenbeta.com')
      })
      .get('/manager', function*() {
        yield this.render('manager')
      })
      .get('/tcontent/post/:id', function*() {
        yield self.CtrlDetail.all(this)
      })
      .get('/find-route', function*() {
        yield self.CtrlPortfolio.findRoute(this)
      })
      .get('/find-master/:id', function*() {
        yield self.CtrlPortfolio.findMaster(this)
      })
      .get('/find-circle', function*() {
        yield self.CtrlPortfolio.findCircle(this)
      })
      .get('/portal/basket/download/qrc/website_mobile', function*() {
        yield this.render('download')
      })
  }
}
