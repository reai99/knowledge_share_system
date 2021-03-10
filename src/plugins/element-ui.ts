import Vue from 'vue'
import i18n from '@/common/lang'
import ElementUI , {MessageBox, Message } from 'element-ui'
import { BasicConfig } from "@/store/modules/app"
import { asyncComponent } from '@/plugins/async-components'
import dialog from '@/plugins/ele-dialog'
import drawer from '@/plugins/ele-draw'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/element-variables.scss'

Vue.use(ElementUI, {
  size: BasicConfig.size,
  i18n: (key: string, value: string) => i18n.t(key, value),
})
Vue.use(asyncComponent)
Vue.use(dialog)
Vue.use(drawer)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
