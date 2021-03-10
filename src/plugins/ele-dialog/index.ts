import Vue from "vue"
import dialogModal from "./index.vue"

export const $dialog = function(option) {
  let div = document.createElement("div")
  document.body.appendChild(div)
  let vm = new Vue({
    name: "Dialog",
    render: createElement => {
      return createElement(dialogModal, { props: option })
    },
  }).$mount(div)
  let $elem = vm.$children[0] as any
  if (this && Array.isArray(this.$children)) {
    this.$children.push($elem)
    $elem.$parent = this
  }
  return $elem
}
export default {
  install(Vue) {
    Vue.prototype.$dialog = $dialog
  },
}
