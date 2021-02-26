import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import elementVariables from '@/assets/css/element-variables.scss'
import defaultSettings from '@/settings'

export interface SettingsState {
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  sidebarTextTheme: boolean;
}

@Module({ dynamic: true, store, name: 'settings' })
class BasicSettings extends VuexModule implements SettingsState {
  public theme = elementVariables.theme
  public fixedHeader = defaultSettings.fixedHeader
  public showSettings = defaultSettings.showSettings
  public showTagsView = defaultSettings.showTagsView
  public showSidebarLogo = defaultSettings.showSidebarLogo
  public sidebarTextTheme = defaultSettings.sidebarTextTheme

  @Mutation
  private CHANGE_SETTING(payload: { key: string ; value }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any}) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(BasicSettings)
