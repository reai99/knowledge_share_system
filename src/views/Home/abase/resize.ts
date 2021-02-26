import { Component, Vue, Watch } from 'vue-property-decorator'
import { BasicConfig, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  get device() {
    return BasicConfig.device
  }

  get sidebar() {
    return BasicConfig.sidebar
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      BasicConfig.CloseSideBar(false)
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      BasicConfig.ToggleDevice(DeviceType.Mobile)
      BasicConfig.CloseSideBar(true)
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      BasicConfig.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Pc)
      if (isMobile) {
        BasicConfig.CloseSideBar(true)
      }
    }
  }
}
