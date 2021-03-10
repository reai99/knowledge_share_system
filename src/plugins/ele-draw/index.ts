import Vue from "vue"
import view from "./index.vue"

export const drawer = function(option) {
  let div = document.createElement("div")
  document.body.appendChild(div)
  let vm = new Vue({
    name: "Drawer",
    render: createElement => {
      return createElement(view, { props: option })
    },
  }).$mount(div)
  // console.log(antd-dialog);
  let $elem = vm.$children[0] as any
  if (this && Array.isArray(this.$children)) {
    this.$children.push($elem)
    $elem.$parent = this
  }
  $elem.visible = true
  return $elem
}
export default {
  install(Vue) {
    Vue.prototype.$drawer = drawer
  },
}
