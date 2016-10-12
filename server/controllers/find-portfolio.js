import ModelMaster from '../models/master'
export default class CtrlMaster extends ModelMaster {
  constructor() {
    super()
  }
  // 找师傅
  * findMaster(koaThis) {
    let id = koaThis.params.id || 0
    let oficialData = yield super.getMasterList(koaThis, id)
    console.log(oficialData.masters)
    yield koaThis.render('find-master', {
      oficialList: oficialData.masters,
      id: id
    })
  }
  // 找圈子
  * findCircle(koaThis) {
    let circleData = yield super.getCircleList(koaThis)
    yield koaThis.render('find-circle', {
      circleList: circleData.hotBetas
    })
  }
  // 找思路
  * findRoute(koaThis) {
    let routeData = yield super.getRouteList(koaThis)
    yield koaThis.render('find-route', {
      routeTitles: routeData.titles,
      routeList: routeData.list
    })
  }
}
