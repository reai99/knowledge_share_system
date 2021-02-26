<template>
  <el-breadcrumb
    class="app-breadcrumb"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
          class="no-redirect"
        >{{ $t('route.' + item.meta.title) }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >{{ $t('route.' + item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = []

  @Watch('$route')
  private onRouteChange(route: Route) {
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  created() {
    this.getBreadcrumb()
  }
  /**
   *通过路由中matched获取相匹配的路径
   */
  private getBreadcrumb() {
    let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
    const first = matched[0]
    if (!this.isDashboard(first)) {
      matched = [{ path: '/dashboard', meta: { title: 'controlpanel' } } as RouteRecord].concat(matched)
    }
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }
  /**
   * 判断是否是主页
   * @route RouteRecord
   */
  private isDashboard(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
  }
  /**
   * 使用path-to-regexp中compile将参数转换为有效路径
   * @path path 路径
   * @private
   */
  private pathCompile(path: string) {
    const { params } = this.$route
    if(!path) {
      path = "./"
    }
    const toPath = compile(path)
    return toPath(params)
  }

  /**
   * 当面包屑被点击跳转到对应的路由页面
   * @param item
   * @private
   */
  private handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect).catch(err => {
        console.warn(err)
      })
      return
    }
    this.$router.push(this.pathCompile(path)).catch(err => {
      console.warn(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
