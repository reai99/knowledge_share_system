<template>
  <el-drawer
    :visible.sync="zVisible"
    :append-to-body="appendToBody"
    :before-close="onClose"
    :close-on-press-escape="closeOnPressEscape"
    :custom-class="customClass"
    :destroy-on-close="destroyOnClose"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :direction="direction"
    :show-close="showClose"
    :size="size"
    :title="title"
    :wrapperClosable="wrapperClosable"
    :withHeader="withHeader"
  >
    <template v-if="zVisible">
      <async-components
        :is="content"
        v-bind="contentProps"
        v-on="contentEvents"
        @closeDrawer="onClose"
        @syncDrawer="syncDrawer"
      />
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator"
@Component({
  name: "antdDraw",
})

export default class AntDraw extends Vue {
  @Prop({ default: '抽屉'}) title!: string
  @Prop({ default: false }) appendToBody!: boolean
  @Prop({ default: true }) closeOnPressEscape!: boolean
  @Prop({ default: '' }) customClass!: string
  @Prop({ default: false }) destroyOnClose!: boolean
  @Prop({ default: true }) modal!: boolean
  @Prop({ default: true }) modalAppendToBody!: boolean
  @Prop({ default: 'rtl' }) direction!: string
  @Prop({ default: true }) showClose!: boolean
  @Prop({ default: '30%' }) size!: string | number
  @Prop({ default: true }) wrapperClosable!: boolean
  @Prop({ default: true }) withHeader!: boolean

  @Prop() content: any
  @Prop({ default: () => ({})}) contentProps: object
  @Prop({ default: () => ({})}) contentEvents: object

  private zVisible = false
  private _uid
  private timer
  mounted(){
    this.zVisible = true
  }
  created() {
    document.body.style.overflow = "hidden"
  }
  beforeDestroy() {
    document.body.style.overflow = "auto"
    if (this.$parent && this.$parent.$children) {
      for (let len = this.$parent.$children.length - 1; len >= 0; len--) {
        if ((this.$parent.$children[len] as any)._uid  === this._uid) {
          this.$parent.$children.splice(len, 1)
        }
      }
    }
  }
  getContainer() {
    return document.body
  }
  onClose() {
    console.log('close')
    this.zVisible = false
    clearTimeout(this.timer)
    this.timer = null
      /*关闭动画结束后*/
    setTimeout(() => {
      this.$emit("input", this.zVisible)
      this.$destroy()
    }, 300)
  }
  syncDrawer(fn) {
    console.log('okkkkk')
    if (this.timer) return
    this.timer = setTimeout(() => {
      this.timer = null
      }, 10000)
    if (!fn && typeof fn !== "function") {
        return this.onClose()
      }
    let result = fn()
    if (result instanceof Promise) {
      return result.then(res => {
            if (res !== false)  this.onClose()
          }).catch(error => {
            clearTimeout(this.timer)
            this.timer = null
          })
    }else if(result !== false) {
        this.onClose()
    }else{
        this.timer = null
    }
  }
}
</script>
