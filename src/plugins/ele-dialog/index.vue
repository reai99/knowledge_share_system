<template>
    <el-dialog
      class="Dialog"
      :visible.sync="visible"
      :title="title"
      :width="dialogWidth"
      :fullscreen="fullscreen"
      :top="top"
      :modal="modal"
      :modalAppendToBody="modalAppendToBody"
      :appendToBody="appendToBody"
      :lockScroll="lockScroll"
      :customClass="customClass"
      :closeOnClickModal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :before-close="closeDialog"
      :center="center"
      :destroyOnClose="destroyOnClose"
    >
      <async-components
        :is="content"
        v-bind="contentProps"
        v-on="contentEvents"
        @onMounted="onComponentMounted"
        @confirmDialog="confirmDialog"
        @closeDialog="closeDialog"
        ref="asyncComponent"
      />
      <template v-if="footer" slot="footer">
        <div ref="DialogFooter" ></div>
      </template>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator"
import { Dialog } from "element-ui"
Vue.use(Dialog)

enum Size {
  mini =  "400px",
  size = "600px",
  medium = "800px",
  large = "1000px"
}
@Component({
  name: "AntdDialog",
})
export default class AntdDialog extends Vue {
  @Prop({ default: "medium" }) size!: string;
  @Prop({ default: "标题"}) title!: string;
  @Prop() width: string | number;
  @Prop({ default: false }) fullscreen!: boolean
  @Prop({ default: '15vh'}) top!: string
  @Prop({ default: true }) modal!: boolean;
  @Prop({ default: true }) modalAppendToBody!: boolean;
  @Prop({ default: true }) appendToBody!: boolean;
  @Prop({ default: true }) lockScroll!: boolean;
  @Prop({ default: ''}) customClass!: string
  @Prop({ default: true }) closeOnClickModal!: boolean;
  @Prop({ default: true }) closeOnPressEscape!: boolean;
  @Prop({ default: false }) center!: boolean;
  @Prop({ default: true }) showClose!: boolean;
  @Prop({ default: false }) destroyOnClose!: boolean;
  @Prop() footer;
  @Prop() callback: any | undefined;
  @Prop() content: any | undefined;
  @Prop({ default: () => ({}) }) contentProps!: object;
  @Prop({ default: () => ({}) }) contentEvents!: object;

  private _timer;
  private _uid;
  private visible = false;

  get dialogWidth(): number | string {
    return this.width !== undefined ? this.width : Size[this.size]
  }

  created() {
    this.visible = true
  }
  beforeDestroy() {
    if (this.$parent && this.$parent.$children) {
      for (let len = this.$parent.$children.length - 1; len >= 0; len--) {
        if ((this.$parent.$children[len] as any)._uid  === this._uid) {
          this.$parent.$children.splice(len, 1)
        }
      }
    }
  }
  onComponentMounted(ref = "antd-dialog-footer") {
    if (this.footer !== undefined && !this.footer) return false
    let dialogFooter = this.$refs["DialogFooter"]
    let footer = (this.$refs["asyncComponent"] as any).$refs[ref]
    if (dialogFooter && footer && footer.nodeType === 1) {
      (dialogFooter as any).appendChild(footer)
    }
  }
  confirmDialog(hook) {
    if (this._timer) return false
    this._timer = setTimeout(() => {
      this._timer = null
    }, 10000)
    if (!hook || typeof hook !== "function") {
      return this.closeDialog(hook)
    }
    let result = hook()
    if (result instanceof Promise) {
      return result
        .then(res => {
          if (res !== false) this.closeDialog(result)
        })
        .catch(error => {
          clearTimeout(this._timer)
          this._timer = null
        })
    } else if (result !== false) {
      this.closeDialog(result)
    } else {
      this._timer = null
    }
  }
  closeDialog(val = false) {
    if (typeof this.callback === "function") {
      this.callback(val)
    }
    clearTimeout(this._timer)
    this._timer = null
    this.visible = false
    setTimeout(() => {
      if (this.$refs["asyncComponent"]) {
        (this.$refs["asyncComponent"] as any).$destroy()
      }
      this.$destroy()
    }, 300)
  }
}
</script>



