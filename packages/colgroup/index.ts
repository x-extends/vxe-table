import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeColgroupComponent from '../table/src/group'

export const VxeColgroup = Object.assign({}, VxeColgroupComponent, {
  install (app: App) {
    app.component(VxeColgroupComponent.name as string, VxeColgroupComponent)
    // 兼容旧用法
    app.component('VxeTableColgroup', VxeColgroupComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeColgroupComponent.name as string, VxeColgroupComponent)
  // 兼容旧用法
  VxeUI.dynamicApp.component('VxeTableColgroup', VxeColgroupComponent)
}

export const Colgroup = VxeColgroup
export default VxeColgroup
