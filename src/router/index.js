/* vue-router config manage */
import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'

Router.prototype.goBack = function () {
  window.history.go(-1)
}
Vue.use(Router)

export default new Router(Routes)
