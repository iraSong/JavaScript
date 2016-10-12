import KoaRouter from 'koa-router'
import RouterSite from './site'
import RouterApi from './api'

class AppRouter {

  constructor() {
    this.router = new KoaRouter()
    this.routerSite = new RouterSite()
    this.routerApi = new RouterApi()
    this.onRoutes()
    this.use()
  }

  onRoutes() {}

  use() {
    this.router.use(
      this.routerSite.router.routes(),
      this.routerApi.router.routes()
    )
  }

}

export default () => {
  let appRouter = new AppRouter()
  return appRouter.router
}
