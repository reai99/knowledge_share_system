import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { constantRoutes } from '@/router'
import store from '@/store'


export interface PermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routes: RouteConfig[] = this.getLetfMenu()
  public dynamicRoutes: RouteConfig[] = []
  private  getLetfMenu() {
    const homeRoute = constantRoutes.find( item => item.name === 'Home')
    if(homeRoute) {
     let menuRoute = JSON.parse(JSON.stringify(homeRoute))
      if(menuRoute.children && menuRoute.children instanceof Array) {
        menuRoute = menuRoute.children
      }
      return menuRoute
    }
    return []
  }
}

export const PermissionModule = getModule(Permission)
