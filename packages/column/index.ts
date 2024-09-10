import { VueConstructor } from 'vue'
import { VxeUI } from '../ui'
import VxeColumnComponent from '../table/src/column'

export const VxeColumn = Object.assign({}, VxeColumnComponent, {
  install (app: VueConstructor) {
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

VxeUI.component(VxeColumnComponent)

export const Column = VxeColumn
export default VxeColumn
