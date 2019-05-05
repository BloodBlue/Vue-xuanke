import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import echarts from 'echarts'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(axios)

Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
