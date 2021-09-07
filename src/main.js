import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import Vant from 'vant'
import 'amfe-flexible'
import router from '../src/router/index'
import 'vant/lib/index.css'

Vue.use(Vant)
/* 引入公共样式组件库 */
import '../src/assets/css/base.css'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
