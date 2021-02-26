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
        path: '/basicmassage',
        name: 'basicmassage',
        component: () => import(/* webpackChunkName: "HomeChild" */ '@/views/AppMain/BasicConfig/IndexAction.vue'),
        meta: {
          title: 'basicmassage',
          icon: 'documentation'
        }
      },
      {
        path: '/article',
        name: 'article',
        redirect: '/article/artlist',
        component: () => import(/* webpackChunkName: "HomeChild" */ '@/views/AppMain/ArticleAdmin/IndexAction.vue'),
        meta: {
          title: 'articleAdmin',
          icon: 'tree-table',
          alwaysShow: true,
        },
        children: [
          {
            path: 'artlist',
            name: 'artlist',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'artlist'
            }
          },
          {
            path: 'artcreate',
            name: 'artcreate',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'artcreate'
            }
          },
          {
            path: 'artlabel',
            name: 'artlabel',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'artlabel'
            }
          },
          {
            path: 'arttype',
            name: 'arttype',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'arttype'
            }
          }
        ]
      },
      {
        path: 'setmenubar',
        name: 'setmenubar',
        component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
        meta: {
          title: 'setmenubar',
          icon: 'nested'
        }
      },
      {
        path: 'useradmin',
        name: 'useradmin',
        component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
        meta: {
          title: 'useradmin',
          icon: 'user'
        }
      },
      {
        path: 'customtlayout',
        name: 'customtlayout',
        component: () => import(/* webpackChunkName: "CustomLayout" */  '@/views/AppMain/CustomLayout/DashBoard/IndexAction.vue'),
        meta: {
          title: 'customtlayout',
          icon: 'example',
          alwaysShow: true,
        },
        children: [
          {
            path: 'custompanel',
            name: 'custompanel',
            component: () => import(/* webpackChunkName: "CustomLayoutDashBoard" */ '@/views/AppMain/CustomLayout/DashBoard/IndexAction.vue'),
            meta: {
              title: 'custompanel'
            }
          },
          {
            path: 'moudleadmin',
            name: 'moudleadmin',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'moudleadmin'
            }
          },
          {
            path: 'customtemplate',
            name: 'customtemplate',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'customtemplate'
            }
          },
          {
            path: 'templatebase',
            name: 'templatebase',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'templatebase'
            }
          },
        ]
      },
      //  二级菜单
      {
        path: '/permission',
        name: 'permission',
        redirect: '/permission/moudle',
        component: () => import(/* webpackChunkName: "HomeChild" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
        meta: {
          title: 'permissionAdmin',
          icon: 'lock',
          alwaysShow: true,
        },
        children: [
          {
            path: 'moudle',
            name: 'moudle',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'moudlepermission'
            }
          },
          {
            path: 'page',
            name: 'pagePermission',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'pagePermission'
            }
          },
          {
            path: 'user',
            name: 'user',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'userpermission'
            }
          }
        ]
      },
      {
        path: 'basicconfig',
        name: 'basicconfig',
        component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
        meta: {
          title: 'basicconfig',
          icon: 'tree',
          alwaysShow: true,
        },
        children: [
          {
            path: 'customfield',
            name: 'customfield',
            component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
            meta: {
              title: 'customfield'
            }
          }
        ]
      },
      {
        path: 'statisticalchart',
        name: 'statisticalchart',
        component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
        meta: {
          title: 'statisticalchart',
          icon: 'chart'
        }
      },
      {
        path: 'operationlog',
        name: 'operationlog',
        component: () => import(/* webpackChunkName: "HomeChildPermission" */ '@/views/AppMain/Permission/AuthAdmin/IndexAction.vue'),
        meta: {
          title: 'operationlog',
          icon: 'clipboard'
        }
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "Test" */ '@/views/Test/IndexAction.vue')
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
// const asyncRoutes: RouteConfig[] = []

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
