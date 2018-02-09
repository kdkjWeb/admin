// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //vue-router
import store from './store' // vuex
import axios_conf from './server' //axios

import MuseUI from 'muse-ui' //Muse-ui
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
import '@/css/reset.css'
Vue.use(MuseUI)

/* 全局插件 */
import Toast from './plugins/Toast/Toast'
Vue.use(Toast)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
