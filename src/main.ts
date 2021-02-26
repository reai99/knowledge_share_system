import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as directives from '@/common/directives'
import * as filter from '@/common/filter'
import i18n from '@/common/lang'

// 公共样式
import "@/assets/css/common.css"
// http
import axios from '@/http'

// 引入svg 和 自定义的svg组件
import SvgIcon from 'vue-svgicon'
import "@/common/svg-icons/components"

//  引入elementUI插件
import '@/plugins/element-ui'

// 注册全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// 注册全局过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, (filter as { [key: string]: Function })[key])
})

// 注册全局svg
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// 模拟数据接口
if(process.env.NODE_ENV === 'development') {
  require('./mock/server')
}
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
