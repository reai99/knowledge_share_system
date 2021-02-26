import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getSidebarStatus, setSidebarStatus, getSize, setSize, setLanguage } from "@/common/cookies"
import { getLocale } from "@/common/lang"

// 判断为pc端还是手机端的枚举
export enum DeviceType {
  Pc,
  Mobile
}

export interface AppState {
  device: DeviceType;
  lang: string;
  size: string;
  showApp: boolean;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {

  // state
  public sidebar = {
    opened: getSidebarStatus() !== 'closed' ,
    withoutAnimation: false
  };
  public device = DeviceType.Pc
  public lang = getLocale()
  public size = getSize() || 'default'
  public showApp = true

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
    if (this.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }
  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }
  @Mutation
  private SET_LANGUAGE(language: string) {
    this.lang = language
    setLanguage(this.lang)
  }
  @Mutation
  private SET_SIZE(size: string) {
    this.size = size
    setSize(this.size)
  }
  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  }
  @Mutation
  private setAppRefresh(){
    this.showApp = !this.showApp
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }
  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }
  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }
  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size)
  }
  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }
  @Action
  public ToggleAppResh(){
    this.setAppRefresh()
    setTimeout(() => {
      this.setAppRefresh()
    },0)
  }
}

export const BasicConfig = getModule(App)
