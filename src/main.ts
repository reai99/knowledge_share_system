import Vue, { DirectiveOptions } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ant-design
import '@/plugins/ant-design-vue'
// 引入全局指令
import * as directives from '@/common/directives'

// 引入svg 和 自定义的svg组件
import SvgIcon from 'vue-svgicon'
import "@/common/svg-icons/components"
// 注册全局svg
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// 注册全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
