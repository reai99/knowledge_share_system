import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './modules/app'
import { SettingsState } from "./modules/settings"
import { TagsViewState } from "./modules/tags-view"
import { PermissionState } from "./modules/permission"
Vue.use(Vuex)

// Vuex state接口
export interface VuexState {
  AppState: AppState;
  settingsState: SettingsState;
  TagsViewState: TagsViewState;
  PermissionState: PermissionState;
}

export default new Vuex.Store<VuexState>({})
