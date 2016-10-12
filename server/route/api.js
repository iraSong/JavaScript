import KoaRouter from 'koa-router'
import CtrlApi from '../controllers/api'

export default class RouterApi {

  constructor() {
    this.api = new CtrlApi()
    this.router = new KoaRouter({
      prefix: '/api'
    })
    this.onRoutes()
  }
  onRoutes() {
    var self = this
    this.router
      .post('/', function * () {
        yield self.api.init(this)
      })
      .post('/ajax', function * () {
        yield self.api.load(this)
      })
      .post('/analyst', function * () {
        yield self.api.analyst(this)
      })
  }

}
