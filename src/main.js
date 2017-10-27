import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

import './common/less/common.less';

Vue.use(VueLazyLoad)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
