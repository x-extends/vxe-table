import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeColumnComponent from '../table/src/column'

export const VxeColumn = Object.assign({}, VxeColumnComponent, {
  install (app: App) {
    app.component(VxeColumnComponent.name as string, VxeColumnComponent)
    // 兼容旧用法
    app.component('VxeTableColumn', VxeColumnComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeColumnComponent.name as string, VxeColumnComponent)
  // 兼容旧用法
  VxeUI.dynamicApp.component('VxeTableColumn', VxeColumnComponent)
}

export const Column = VxeColumn
export default VxeColumn
