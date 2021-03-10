<template>
  <keep-alive v-if="keepAlive">
    <component
      :is="AsyncComponent"
      v-if="!!AsyncComponent"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </keep-alive>
  <component
    :is="AsyncComponent"
    v-else-if="!!AsyncComponent"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator"
import { asyncLoader } from "./async-loader"
@Component({
  name: "asyncComponents",
})
export default class AsyncComponents extends Vue {
  @Prop({ required: true }) component: any
  // 需要动态加载的组件,格式为 component: ()=>import("@/xxx/xxx.vue")
  @Prop({ default: false }) keepAlive: boolean
  @Prop({ default: 0 }) delay: number
  @Prop({ default: 0}) timeout: number

  private AsyncComponent
  @Watch('component')
  onChangeComponent(val: any) {
    this.componentLoader(val)
  }

  created() {
    this.componentLoader(this.component)
  }
  beforeDestroy() {
    this.AsyncComponent = null
  }

  componentLoader(component) {
    this.AsyncComponent = asyncLoader(component)
    this.forceUpdate()
  }
  forceUpdate() {
    this.$nextTick(() => {
      this.$forceUpdate()
    })
  }
}

// export default {
//   name: "AsyncComponents",
//   inheritAttrs: false,
//   props: {
//     // 是否保持缓存
//     keepAlive: {
//       type: Boolean,
//       require: false,
//       default: false,
//     },
//     // 需要动态加载的组件,格式为 component: ()=>import("@/xxx/xxx.vue")
//     component: {
//       type: [Function],
//       require: true,
//       default: undefined,
//     },
//     // 延迟加载时间
//     delay: {
//       type: Number,
//       default: 0,
//     },
//     // 超时警告时间
//     timeout: {
//       type: Number,
//       default: 10000
//     }
//   },
//   data() {
//     return {
//       AsyncComponent: null
//     };
//   },
//   watch: {
//     component: function(val) {
//       this.componentLoader(val);
//     }
//   },
//   beforeDestroy() {
//     this.AsyncComponent = null;
//     // console.log("AsyncComponent destroyed");
//   },
//   created() {
//     // 构建异步组件 - 懒加载实现
//     this.componentLoader(this.component);
//   },
//   methods: {
//     forceUpdate() {
//       this.$nextTick(() => {
//         this.$forceUpdate();
//       });
//     },
//     componentLoader(component) {
//       this.AsyncComponent = asyncLoader(component);
//       this.forceUpdate();
//     }
//   }
// };
// </script>
