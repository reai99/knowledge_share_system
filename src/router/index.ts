import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

export const constantRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: 'dashboard',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/IndexAction.vue'),
    // children为左侧菜单栏
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "HomeChild" */ '@/views/AppMain/DashBoard/IndexAction.vue'),
        meta: {
          title: 'controlpanel',
          icon: 'dashboard',
          affix: true  //黏性菜单，不会被移除
        }
      },
      {
        path: '/articletype',
        name: 'articletype',
        component: () => import(/* webpackChunkName: "HomeChild" */ '@/views/AppMain/ArticleType/IndexAction.vue'),
        meta: {
          title: 'articletype',
          icon: 'documentation'
        }
      },
      {
        path: '/mindcreate',
        name: 'mindcreate',
        component: () => import(/* webpackChunkName: "HomeChild" */ '@/views/AppMain/CreateMind/IndexAction.vue'),
        meta: {
          title: 'mindcreate',
          icon: 'documentation'
        }
      },
      {
        path: '/article',
        name: 'article',
        redirect: '/article/artlist',
        component: () => import(/* webpackChunkName: "Article" */ '@/common/components/RouterView/IndexAction.vue'),
        meta: {
          title: 'articleAdmin',
          icon: 'tree-table',
          alwaysShow: true,
        },
        children: [
          {
            path: 'artlist',
            name: 'artlist',
            component: () => import(/* webpackChunkName: "ArticleList" */ '@/views/AppMain/ArticleList/IndexAction.vue'),
            meta: {
              title: 'artlist',
              noCache: true
            }
          },
          {
            path: 'artcreate',
            name: 'artcreate',
            component: () => import(/* webpackChunkName: "ArticleCreate" */ '@/views/AppMain/ArticleCreate/IndexAction.vue'),
            meta: {
              title: 'artcreate',
              noCache: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login/IndexAction.vue')
  },
  {
    path: '/404',
    name: 'error404',
    component: () => import(/* webpackChunkName: "errorPage-404" */ '@/views/Error/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]


const createRouter = () => new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// 动态替换路由
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher
}

router.beforeEach((to: Route, _: Route, next: any) => {
  NProgress.start()
  if (window.localStorage.getItem('token')) {
    next()
  } else {
    if (to.name !== 'Login') {
      router.push({ name: 'Login' })
    }
    next()

  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
